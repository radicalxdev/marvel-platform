const admin = require("firebase-admin");
const { logger } = require("firebase-functions");
const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const Brevo = require("@getbrevo/brevo");

const { emailValidation } = require("../utils/StringUtil");
const { STATUS } = require("../constants");
const { generateCertificate } = require("./certificatesController");

/* Brevo Configuration */
const defaultClient = Brevo.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = [process.env.BREVO_API_KEY];
const partnerKey = defaultClient.authentications["partner-key"];
partnerKey.apiKey = process.env.BREVO_API_KEY;
const apiInstance = new Brevo.TransactionalEmailsApi();
const sendSmtpEmail = new Brevo.SendSmtpEmail();
/* ******************* */

/**
 * Executes the "welcome" email trigger every time a document in the "users" collection is updated.
 *
 * @param {string} userId - the ID of the user document being updated
 * @param {function} event - the event object containing information about the update
 * @return {Promise} a promise that resolves when the welcome email is sent successfully or rejects with an error
 */
const welcome = onDocumentUpdated("users/{userId}", async (event) => {
  const avatarIdBefore = event.data.before.data()?.avatarId;
  const avatarIdAfter = event.data.after.data()?.avatarId;

  if (!avatarIdAfter || avatarIdBefore) return;

  const TEMPLATE_ID = 9;

  const userDoc = event.data.data();
  const { email, fullName = "" } = userDoc;
  const FName = fullName.split(" ")?.[0] || null;

  if (!emailValidation(email)) {
    logger.error(`Email for ${event.params.userId} is not valid.`);
    return;
  }

  sendSmtpEmail.templateId = TEMPLATE_ID;
  sendSmtpEmail.to = [{ email: email, name: fullName }];
  sendSmtpEmail.params = { FNAME: FName };

  await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      logger.log(`Welcome email successfully sent to ${event.params.userId}`);
    },
    (error) => {
      logger.error(error);
    }
  );
});

/**
 * This function is triggered when a document is updated in the "enrolledPlayers" collection. It handles the completion of a quest by a player.
 * It sends an email to the player's email address notifying them that they have completed the quest. 
 * It then generates a certificate for the player if they have completed the quest.
 *
 * @param {type} event - the event object containing information about the document update
 * @return {type} description of return value
 */
const questCompletion = onDocumentUpdated(
  "enrolledPlayers/{enrollId}",
  async (event) => {
    const TEMPLATE_ID_QUEST_COMPLETION_FIRST = 11;
    const TEMPLATE_ID_QUEST_COMPLETION = 12;

    try {
      const enrollDoc = event.data.after.data();
      const beforeEnrollDoc = event.data.before.data();
      const { challengeId, userId, status } = enrollDoc;

      if (
        status !== STATUS.COMPLETED ||
        enrollDoc?.certificate ||
        beforeEnrollDoc?.status === enrollDoc?.status
      )
        return;

      const allUserQuests = await admin
        .firestore()
        .collection("enrolledPlayers")
        .where("userId", "==", userId)
        .get();
      const isFirstQuest = allUserQuests.size === 1;

      const userRef = await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .get();
      const { email, fullName } = userRef.data();
      const FirstName = fullName.split(" ")?.[0] || null;

      sendSmtpEmail.templateId = isFirstQuest
        ? TEMPLATE_ID_QUEST_COMPLETION_FIRST
        : TEMPLATE_ID_QUEST_COMPLETION;
      sendSmtpEmail.to = [{ email: email, name: fullName }];
      sendSmtpEmail.params = { FirstName };

      await apiInstance.sendTransacEmail(sendSmtpEmail).then(
        () => {
          logger.log(
            `Quest completion email successfully sent for ${event.params.enrollId}`
          );
        },
        (error) => {
          logger.error(error);
        }
      );

      /* Generate Certificate */
      const certificate = await generateCertificate({ fullName, challengeId });

      await event.data.after.ref.update({
        certificate: {
          pdfUrl: certificate.pdf_url,
          imageUrl: certificate.image_url,
        },
      });
    } catch (error) {
      logger.log(error);
    }
  }
);

module.exports = {
  welcome,
  questCompletion,
};
