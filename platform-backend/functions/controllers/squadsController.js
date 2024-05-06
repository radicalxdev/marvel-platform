const admin = require("firebase-admin");
const { https, logger } = require("firebase-functions");
const { generateToken } = require("../utils/StringUtil");
const { v4: uuidv4 } = require("uuid");
const { SQUAD_STATUS, SQUAD_ROLE } = require("../constants");

const DEBUG = process.env.DEBUG;

const DEFAULT_SQUAD_DOC = ["name", "region", "proficiency", "coverBg", "focus"];
const ADD_MEMBER_PROPS = ["newMemberId", "inviteToken", "squadId"];

/**
 * Adds the userId to the squad's invitations list using the userId and squadId.
 *
 * @param {Object} data - The data object containing the squadId and userId.
 * @param {Object} context - The context object containing information about the authenticated user.
 * @throws {HttpsError} If any of the required fields (squadId, userId) are missing in the data object.
 * @return {Object} An object with a status and message property indicating the success of the operation.
 */
exports.sendInvite = https.onCall(async (data, context) => {
  const { squadId, userId } = data;
  // If squadId and userId values are not passed, it throws an Error.
  if (!squadId || !userId) {
    throw new https.HttpsError(
      "failed-precondition",
      "Please provide all required fields: squadId and userId"
    );
  }
  // Check if userId is a string.
  if (typeof userId !== "string")
    throw new https.HttpsError("invalid-argument", "userId must be a string.");
  // Check if squadId is a string.
  if (typeof squadId !== "string")
    throw new https.HttpsError("invalid-argument", "squadId must be a string.");

  const squadDoc = await admin
    .firestore()
    .collection("squads")
    .doc(squadId)
    .get();

  // If squad document does not exists, throws an error.
  if (!squadDoc.exists)
    throw new https.HttpsError("not-found", "Squad not found");

  DEBUG && logger.log("squadDoc", squadDoc?.data());

  const { invitations } = squadDoc.data();

  // If the user is already on the invitation list, it throws an error.
  if (invitations.includes(userId))
    throw new https.HttpsError(
      "already-exists",
      "User is already on invitation list"
    );

  try {
    // Updates the squadDoc invitations list adding the new userId.
    await squadDoc.ref.update({
      invitations: [...invitations, userId],
    });

    DEBUG && logger.log("squadDoc", squadDoc?.data());

    return {
      status: "success",
      message: "User added to invitations list succesfully.",
    };
  } catch (error) {
    DEBUG && logger.log("Failed to update invitations list", error);
    throw new https.HttpsError(
      "update-fail",
      "Failed to update invitations list."
    );
  }
});

/**
 * Updates squad's invitations and members list using the userId, squadId and either response or inviteToken.
 *
 * @param {Object} data - The data object containing the squadId, userId and either response or inviteToken.
 * @param {Object} context - The context object containing information about the authenticated user.
 * @throws {HttpsError} If any of the required fields (squadId, userId and response or inviteToken) are missing in the data object.
 * @return {Object} An object with a status and message property indicating the success of the operation.
 */
exports.inviteResponse = https.onCall(async (data, context) => {
  const { userId, squadId, response, inviteToken } = data;
  DEBUG && logger.log("data", data);
  if (
    !squadId ||
    !userId ||
    response === undefined ||
    response === null ||
    typeof response !== "boolean"
  ) {
    throw new https.HttpsError(
      "failed-precondition",
      "Please provide all required fields: squadId, userId and response"
    );
  }
  // Check if userId is a string.
  if (typeof userId !== "string")
    throw new https.HttpsError("invalid-argument", "userId must be a string.");

  // Check if squadId is a string.
  if (typeof squadId !== "string")
    throw new https.HttpsError("invalid-argument", "squadId must be a string.");

  // Check if inviteToken is a string.
  if (inviteToken && typeof inviteToken !== "string")
    throw new https.HttpsError(
      "invalid-argument",
      "inviteToken must be a string."
    );

  const squadsCollection = await admin.firestore().collection("squads").get();

  if (squadsCollection.empty)
    throw new https.HttpsError("not-found", "Squads collection not found");

  // If user is already a member of a squad throws an error
  squadsCollection.forEach((currSquad) => {
    const { members } = currSquad.data();
    if (members.some((member) => member.userId === userId))
      throw new https.HttpsError(
        "failed-precondition",
        "User is already a member of a squad."
      );
  });

  const squadDoc = await admin
    .firestore()
    .collection("squads")
    .doc(squadId)
    .get();

  // If squad document does not exists, throws an error.
  if (!squadDoc.exists)
    throw new https.HttpsError("not-found", "Squad not found");

  DEBUG && logger.log("squadDoc", squadDoc?.data());

  const { members, status, inviteToken: validInviteToken } = squadDoc.data();

  if (status !== SQUAD_STATUS.ACTIVE || members.length > 5)
    throw new https.HttpsError(
      "failed-precondition",
      "Squad is already full or not seeking members."
    );

  if (members.some((member) => member.userId === userId))
    throw new https.HttpsError(
      "failed-precondition",
      "User is already a member on the squad."
    );

  let updateDoc;
  // User accepted invite by invitation link
  if (inviteToken) {
    if (inviteToken !== validInviteToken)
      throw new https.HttpsError("not-found", "Invalid invite token");

    updateDoc = {
      members: [...members, { userId, role: SQUAD_ROLE.MEMBER }],
      status:
        members.length + 1 > 5 ? SQUAD_STATUS.NOT_SEEKING : SQUAD_STATUS.ACTIVE,
    };
  } else {
    const { invitations } = squadDoc.data();

    // If the user is not on the invitation list, it throws an error.
    if (!invitations.includes(userId))
      throw new https.HttpsError(
        "already-exists",
        "User is not on the invitation list"
      );

    // Updates the squadDoc invitations list removing the userId.
    const updatedInvitations = invitations.filter((id) => id !== userId);

    updateDoc = response
      ? {
          members: [...members, { userId, role: SQUAD_ROLE.MEMBER }],
          status:
            members.length + 1 > 5
              ? SQUAD_STATUS.NOT_SEEKING
              : SQUAD_STATUS.ACTIVE,
          invitations: members.length + 1 > 5 ? [] : updatedInvitations,
        }
      : {
          invitations: updatedInvitations,
        };
  }

  try {
    await squadDoc.ref.update(updateDoc);
    DEBUG && logger.log("squadDoc", squadDoc?.data());

    return {
      status: "success",
      message: inviteToken
        ? "Squad's members list updated succesfully."
        : response
        ? "Squad's invitation and members list updated succesfully."
        : "User has declined invitation.",
    };
  } catch (error) {
    DEBUG && logger.log("Failed to update invitations list", error);
    throw new https.HttpsError(
      "update-fail",
      "Failed to update invitations list."
    );
  }
});

/**
 * Creates a new squad in the Firestore collection "squads" with the provided data.
 *
 * @param {Object} data - The data object containing squad formation details.
 * @param {Object} context - The context object containing information about the authenticated user.
 * @throws {HttpsError} If any of the required fields are missing or if the squad name is not unique.
 * @return {Object} An object with a status and message property indicating the success of the operation.
 */
exports.createSquad = https.onCall(async (data, context) => {
  const { name, region, proficiency, coverBg, focus } = data;

  DEBUG && logger.log("squadData", data);

  // Validate required fields
  if (!name || !focus || !proficiency || !region || !coverBg) {
    const missingFields = DEFAULT_SQUAD_DOC?.filter((key) => !data[key]);

    DEBUG && logger.log("missingFields", missingFields);

    // Throws an error: "Please provide all required missing fields"
    throw new https.HttpsError(
      "failed-precondition",
      `Please provide all required missing fields: ${missingFields.join(", ")}`
    );
  }

  // If the type of variable name is string, it continues. Else throws an error: Name must be string
  if (typeof name !== "string")
    throw new https.HttpsError("invalid-argument", "name must be type string.");

  // Throws an error if focus is not an array of strings
  if (
    !(
      Array.isArray(focus) &&
      focus.length > 0 &&
      focus.every((item) => typeof item === "string")
    )
  )
    throw new https.HttpsError(
      "invalid-argument",
      "focus must be an array of strings."
    );

  // Validates with the PROFICIENCY constant, if is not it throws an error
  if (typeof proficiency !== "string")
    throw new https.HttpsError(
      "invalid-argument",
      "proficiency must be a string."
    );

  // If the type of variable region is string, it continues. Else throws an error: Region must be type string
  if (typeof region !== "string")
    throw new https.HttpsError(
      "invalid-argument",
      "region must be type string."
    );

  // If the type of variable coverBG is string, it continues. Else throws an error: CoverBg must be type string
  if (typeof coverBg !== "string")
    throw new https.HttpsError(
      "invalid-argument",
      "coverBg must be type string."
    );

  // Check if squad name is unique
  const squadSnapshot = await admin
    .firestore()
    .collection("squads")
    .where("name", "==", name)
    .get();

  DEBUG && logger.log("squadSnapshot", squadSnapshot);

  if (!squadSnapshot.empty)
    throw new https.HttpsError(
      "already-exists",
      "A squad with this name already exists"
    );

  const squadsCollection = await admin.firestore().collection("squads").get();

  // Loops through the squads collection and looks if the user is already a leader.
  squadsCollection.forEach((doc) => {
    const { members } = doc.data();
    const leadFound = members.some(
      (member) => member.userId === context?.auth?.uid
    );
    if (leadFound)
      throw new https.HttpsError(
        "already-exists",
        "User already leads a squad."
      );
  });

  const inviteToken = generateToken(12);

  const user = {
    userId: context?.auth?.uid,
    role: SQUAD_ROLE.ADMIN,
  };
  // Create a document reference without saving it
  const squadRef = admin.firestore().collection("squads").doc();
  const squadId = squadRef.id; // Get the auto-generated ID

  try {
    // Create the squad document
    const squadDoc = {
      id: squadId,
      name,
      region,
      proficiency,
      coverBg,
      focus,
      inviteToken,
      members: [user],
      status: SQUAD_STATUS.ACTIVE, // Set initial status
      openRoles: [],
      applications: [],
      pinnedLinks: [],
      invitations: [],
    };

    DEBUG && logger.log("squadDoc", squadDoc);

    // Add the squad to Firestore
    await squadRef.set(squadDoc);

    return {
      status: "success",
      message: "Squad created successfully",
      data: { inviteToken },
    };
  } catch (error) {
    DEBUG && logger.log("internal", error);
    throw new https.HttpsError("internal", "Failed to create squad");
  }
});

/**
 * Saves a member to the squad's members list using squadId, inviteToken and newMemberId.
 *
 * @param {Object} data - The data object containing inviteToken, newMemberId and squadId.
 * @param {Object} context - The context object containing information about the authenticated user.
 * @throws {HttpsError} If any of the required fields are missing or if the squad is not found.
 * @return {Object} An object with a status and message property indicating the success of the operation.
 */
exports.addSquadMember = https.onCall(async (data, context) => {
  const { newMemberId, inviteToken, squadId } = data;

  // Validate required fields
  if (!newMemberId || !inviteToken || !squadId) {
    const missingFields = ADD_MEMBER_PROPS?.filter((key) => !data[key]);
    // Throws an error: "Please provide all required missing fields"
    throw new https.HttpsError(
      "failed-precondition",
      `Please provide all required missing fields: ${missingFields.join(", ")}`
    );
  }

  const squadDoc = await admin
    .firestore()
    .collection("squads")
    .doc(squadId)
    .get();

  if (!squadDoc.exists)
    throw new https.HttpsError("not-found", "Squad not found");

  const { members, status, inviteToken: validInviteToken } = squadDoc.data();

  if (inviteToken !== validInviteToken)
    throw new https.HttpsError("not-found", "Invalid token");

  // Checks if squad is already full or not seeking
  if (members.length === 6 || status !== SQUAD_STATUS.ACTIVE)
    throw new https.HttpsError(
      "failed-precondition",
      "Squad is already full or not seeking members."
    );

  // Checks if newMemberId is already on the members list.
  const userAlreadyExists = members?.some(
    (member) => member.userId === newMemberId
  );

  if (userAlreadyExists)
    throw new https.HttpsError(
      "already-exists",
      "User is already on the squad"
    );

  try {
    const updatedMembers = [
      ...members,
      {
        userId: newMemberId,
        role: SQUAD_ROLE.MEMBER,
      },
    ];
    const updateSquad = {
      members: updatedMembers,
      status:
        updatedMembers.length === 6
          ? SQUAD_STATUS.NOT_SEEKING
          : SQUAD_STATUS.ACTIVE,
    };

    await squadDoc.ref.update(updateSquad);

    return { status: "success", message: "Squad member updated successfully" };
  } catch (error) {
    throw new https.HttpsError("internal", "Failed to update squad's members.");
  }
});

/**
 * Submits a user's application to join a squad and updates the user's profile.
 *
 * @param {Object} data - The data object containing the application details and squad ID.
 * @param {string} data.squadId - The ID of the squad the user is applying to.
 * @param {Object} data.applicationDetails - The details of the user's application, including profile basics, skills, experience, availability, and links.
 * @param {Object} context - The context object providing the authenticated user's context.
 * @return {Promise<Object>} A promise that resolves to an object containing the result status and message or rejects with an error if the operation is unsuccessful.
 *
 * Throws appropriate HTTPS errors if validation fails or if the transaction cannot be completed.
 */
exports.squadApplication = https.onCall(async (data, context) => {
  DEBUG && logger.log("Received data:", data);

  const { squadId, applicationDetails } = data;

  // Validate squadId and applicationDetails presence
  if (!squadId)
    throw new https.HttpsError("invalid-argument", "Squad ID is required.");

  if (!applicationDetails)
    throw new https.HttpsError(
      "invalid-argument",
      "Application details are required."
    );

  // Define and check the squad document
  const squadRef = admin.firestore().collection("squads").doc(squadId);
  const squadDoc = await squadRef.get();
  DEBUG && logger.log("Fetched squad document:", squadDoc.data());
  const { status, openRoles, applications } = squadDoc.data();

  if (!squadDoc.exists) {
    DEBUG && logger.log("Squad document not found:", squadId);
    throw new https.HttpsError("not-found", "Squad not found.");
  }

  // Check if squad is active
  if (status !== SQUAD_STATUS.ACTIVE) {
    DEBUG && logger.log("Squad is not active, cannot accept applications.");
    throw new https.HttpsError(
      "failed-precondition",
      "Squad is not accepting applications."
    );
  }

  // Destructure the application details
  const { experience, roleId, userId, skills, timezone, availability, links } =
    applicationDetails;

  // Check if the roleId exists in the OpenRoles of the squad
  const roleExists = openRoles?.some((role) => role.id === roleId);
  if (!roleExists) {
    DEBUG && logger.log("Invalid roleId provided:", roleId);
    throw new https.HttpsError(
      "invalid-argument",
      "The specified role ID does not exist in the squad."
    );
  }

  // Prepare the application object
  const application = {
    id: uuidv4(),
    userId,
    roleId,
    experience,
    skills,
    timezone,
    availability,
    links,
  };
  DEBUG && logger.log("Application object prepared:", application);

  // Check if the application already exists for the user and role
  const applicationAlreadyExists = applications?.some(
    (app) => app.userId === userId && app.roleId === roleId
  );

  if (applicationAlreadyExists) {
    DEBUG &&
      logger.log(
        "An application from this user and for this role already exists.",
        `userId: ${userId}`,
        `roleId: ${roleId}`
      );
    throw new https.HttpsError(
      "already-exists",
      "An application from this user and for this role already exists."
    );
  }

  // Get user doc ref
  const userRef = admin.firestore().collection("users").doc(context.auth.uid);

  try {
    // Update user profile
    await userRef.update({
      availability,
      timezone,
      links,
      skills,
      experience,
    });
    DEBUG &&
      logger.log("Updated user profile:", {
        availability,
        timezone,
        links,
        skills,
        experience,
      });

    // Add the application to the squad's applications array
    const newApplications = [...applications, application];
    DEBUG &&
      logger.log(
        "Adding application to squad's applications array:",
        application
      );
    await squadRef.update({ applications: newApplications });
    DEBUG &&
      logger.log(
        "Application added to squad's applications array successfully."
      );

    return { success: true, message: "Application submitted successfully." };
  } catch (error) {
    logger.log("Operation failed with error:", error);
    throw new https.HttpsError(
      "unknown",
      `An error occurred while submitting the application: ${error.message}`
    );
  }
});

/**
 * Handles the response to a user's application to join a squad by either approving or denying it.
 * If approved, the user is added to the squad's members list and removed from the applications list.
 * If denied, the user is simply removed from the applications list.
 *
 * @param {Object} data - The data object containing necessary identifiers and response.
 * @param {string} data.squadId - The ID of the squad to which the user applied.
 * @param {string} data.userId - The ID of the user whose application is being responded to.
 * @param {string} data.roleId - The role ID that the user applied for within the squad.
 * @param {boolean} data.response - The boolean response to the application; true for approval, false for denial.
 * @param {Object} context - The context object providing the authenticated user's context, typically used for security checks (not explicitly shown in this example).
 * @return {Promise<Object>} A promise that resolves to an object containing the result status and message. If the operation is successful, the message confirms the action taken (approved or denied). If unsuccessful, the promise rejects with an HTTPS error detailing the reason.
 *
 * Throws appropriate HTTPS errors if necessary identifiers are missing, if the squad or application does not exist, or if any other precondition is not met.
 */
exports.applicationResponse = https.onCall(async (data, context) => {
  const { squadId, userId, response, applicationId } = data;

  DEBUG &&
    logger.log(
      "squadId:",
      squadId,
      "userId:",
      userId,
      "response:",
      response,
      "applicationId:",
      applicationId
    );

  if (!squadId || !userId || !applicationId || typeof response !== "boolean") {
    throw new https.HttpsError(
      "invalid-argument",
      "The function must be called with 'squadId', 'userId', 'response' and 'applicationId'. "
    );
  }

  const squadRef = admin.firestore().collection("squads").doc(squadId);
  const squadDoc = await squadRef.get();

  DEBUG && logger.log("squad document", squadDoc.data());

  if (!squadDoc.exists) {
    throw new https.HttpsError("not-found", "Squad not found");
  }

  const { applications, members, status } = squadDoc.data();

  if (status !== SQUAD_STATUS.ACTIVE || members.length > 5) {
    DEBUG && logger.log("Squad is already full or not seeking members.");
    throw new https.HttpsError(
      "failed-precondition",
      "Squad is already full or not seeking members."
    );
  }

  const applicationIndex = applications.findIndex(
    (app) => app.id === applicationId
  );

  if (applicationIndex === -1) {
    throw new https.HttpsError("not-found", "Application not found");
  }

  if (members.some((member) => member.userId === userId))
    throw new https.HttpsError(
      "failed-precondition",
      "User is already a member on the squad."
    );

  const newApplications = applications.filter(
    (app) => app.id !== applicationId
  );

  DEBUG && logger.log("new applications", newApplications);

  const newMember = { userId, role: SQUAD_ROLE.MEMBER };

  const updateDoc = response
    ? {
        applications: newApplications,
        members: [...members, newMember],
        status:
          members.length + 1 > 5
            ? SQUAD_STATUS.NOT_SEEKING
            : SQUAD_STATUS.ACTIVE,
      }
    : {
        applications: newApplications,
      };

  DEBUG && logger.log("update data", updateDoc);

  try {
    DEBUG &&
      logger.log(
        response
          ? "Approving application, updating members and squad status."
          : "Denying application, removing from applications array."
      );
    await squadRef.update(updateDoc);
    return {
      status: "success",
      message: response
        ? "Application approved and member added successfully."
        : "Application denied and removed successfully.",
    };
  } catch (error) {
    logger.log("Failed to update the squad document:", error);
    throw new functions.https.HttpsError(
      "unknown",
      "An error occurred while updating the squad document: " + error.message
    );
  }
});

/**
 * Updates a squad in the Firestore collection "squads" with the provided data.
 *
 * @param {Object} data - The data object containing squad update and role details.
 * @param {Object} context - The context object containing information about the authenticated user.
 * @throws {HttpsError} If any of the required fields are missing or if the squad name is not unique.
 * @return {Object} An object with a status and message property indicating the success of the operation.
 */
exports.updateSquadInfo = https.onCall(async (data, context) => {
  const { updatedData, squadId } = data;

  if (!updatedData || !squadId) {
    throw new https.HttpsError(
      "failed-precondition",
      "Please provide updatedData and squadId"
    );
  }

  // Get the squad data from firestore
  const squadDoc = await admin
    .firestore()
    .collection("squads")
    .doc(squadId)
    .get();

  if (!squadDoc.exists)
    throw new https.HttpsError("not-found", "Squad not found");
  // Check if updatedData is an object
  if (typeof updatedData !== "object") {
    throw new https.HttpsError(
      "invalid-argument",
      "The updatedData must be an object"
    );
  }

  try {
    await squadDoc.ref.update({ ...updatedData });
    return {
      status: "success",
      message: "Squad info data updated successfully",
    };
  } catch (error) {
    throw new https.HttpsError(
      "update-fail",
      "Failed to update the squad info data"
    );
  }
});

/**
 * Adds a squad role in the openRoles array of a squad in the Firestore collection "squads".
 *
 * @param {Object} data - The data object containing role, proficiency, and squadId.
 * @param {Object} context - The context object containing information about the authenticated user.
 * @throws {HttpsError} If any of the required fields are missing or if the squad is not found.
 * @return {Object} An object with a status and message property indicating the success of the operation.
 */
exports.addSquadRole = https.onCall(async (data, context) => {
  const { role, proficiency, squadId } = data;

  if (!role || !proficiency || !squadId) {
    throw new https.HttpsError(
      "failed-precondition",
      "Please provide role, proficiency, and squadId"
    );
  }

  // Get the squad data from firestore
  const squadDoc = await admin
    .firestore()
    .collection("squads")
    .doc(squadId)
    .get();

  if (!squadDoc.exists) {
    throw new https.HttpsError("not-found", "Squad not found");
  }

  const { openRoles } = squadDoc.data();

  const updatedOpenRoles = [...openRoles, { role, proficiency, id: uuidv4() }];

  try {
    await squadDoc.ref.update({ openRoles: updatedOpenRoles });
    return {
      status: "success",
      message: "Squad role added successfully",
    };
  } catch (error) {
    throw new https.HttpsError("update-fail", "Failed to add the squad role");
  }
});

/**
 * Modifies a squad role in the openRoles array of a squad in the Firestore collection "squads".
 *
 * @param {Object} data - The data object containing roleData, squadId, and roleId.
 * @param {Object} context - The context object containing information about the authenticated user.
 * @throws {HttpsError} If any of the required fields are missing or could not find the squad.
 * @return {Object} An object with a status and message property indicating the success of the operation.
 */
exports.editSquadRole = https.onCall(async (data, context) => {
  const { roleData, squadId, roleId } = data;

  if (!roleData || !squadId || !roleId) {
    throw new https.HttpsError(
      "failed-precondition",
      "Please provide roleData, squadId, and roleId"
    );
  }

  // Get the squad data from firestore
  const squadDoc = await admin
    .firestore()
    .collection("squads")
    .doc(squadId)
    .get();

  if (!squadDoc.exists)
    throw new https.HttpsError("not-found", "Squad not found");

  const { openRoles } = squadDoc.data();

  // Find the the role with the provided id
  const roleDoc = openRoles?.find((role) => role?.id === roleId);

  // If not found, throw an error
  if (!roleDoc) throw new https.HttpsError("not-found", "Squad role not found");

  // Update the role in the openRoles array
  const updatedOpenRoles = openRoles?.map((role) => {
    if (role?.id === roleId) {
      return { ...role, ...roleData };
    }
    return role;
  });

  try {
    await squadDoc.ref.update({ openRoles: updatedOpenRoles });
    return {
      status: "success",
      message: "Squad role modified successfully",
    };
  } catch (error) {
    throw new https.HttpsError(
      "update-fail",
      "Failed to modify the squad role"
    );
  }
});

/**
 * Deletes a squad in the Firestore collection "squads" with the provided data.
 *
 * @param {Object} data - The data object containing role id and squad id.
 * @param {Object} context - The context object containing information about the authenticated user.
 * @throws {HttpsError} If any of the required fields are missing or if the squad name is not unique.
 * @return {Object} An object with a status and message property indicating the success of the operation.
 */
exports.deleteSquadRole = https.onCall(async (data, context) => {
  const { roleId, squadId } = data;

  if (!roleId || !squadId) {
    throw new https.HttpsError(
      "failed-precondition",
      "Please provide squadRole and squadId"
    );
  }
  // Get the squad data from firestore
  const squadDoc = await admin
    .firestore()
    .collection("squads")
    .doc(squadId)
    .get();

  if (!squadDoc.exists)
    throw new https.HttpsError("not-found", "Squad not found");

  if (typeof roleId !== "string") {
    throw new https.HttpsError("invalid-argument", "roleId must be an string");
  }

  const { openRoles } = squadDoc.data();
  const updatedOpenRoles = openRoles.filter((role) => role.id !== roleId);

  try {
    await squadDoc.ref.update({ openRoles: updatedOpenRoles });
    return {
      status: "success",
      message: "Squad role data deleted successfully",
    };
  } catch (error) {
    throw new https.HttpsError(
      "update-fail",
      "Failed to update the squad info data"
    );
  }
});
