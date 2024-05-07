const admin = require('firebase-admin');
const { Bannerbear } = require('bannerbear');
const moment = require('moment');
const { logger } = require('firebase-functions');
const { onCall } = require('firebase-functions/v2/https');

const bb = new Bannerbear(process.env.BANNER_BEAR_API_KEY);

const TEMPLAT_ID = '4KnlWBbKv1exDOQGgm';

/**
 * Generates a certificate using the provided props.
 *
 * @param {Object} props - The properties needed to generate the certificate.
 * @param {string} props.fullName - The full name of the awardee.
 * @param {string} props.challengeId - The ID of the challenge.
 * @return {Promise} A promise that resolves to the generated certificate.
 */
const generateCertificate = async (props) => {
  logger.log('process.env: ', process.env);
  const { fullName, challengeId } = props;

  const challengeDoc = await admin
    .firestore()
    .collection('challenges')
    .doc(challengeId)
    .get();

  if (!challengeDoc.exists) throw new 'Challenge does not exist'();

  const challengeData = challengeDoc.data();

  return bb.create_image(
    TEMPLAT_ID,
    {
      modifications: [
        {
          name: 'awardee_name',
          text: fullName,
          color: null,
          background: null,
        },
        {
          name: 'course',
          text: challengeData.name || '',
          color: null,
          background: null,
        },
        {
          name: 'date',
          text: moment().format('MMMM D, YYYY'),
          color: null,
          background: null,
        },
      ],
      render_pdf: true,
    },
    true
  );
};

/**
 * Generates a challenge certificate based on the request data.
 *
 * @param {Object} request.data - The data object containing fullName, challengeId, and userId.
 * @return {Object} The status of the generateCertificate function.
 */
const generateChallengeCertificate = onCall(async (request) => {
  try {
    logger.log('request data: ', request.data);

    if (
      !request.data.fullName ||
      !request.data.challengeId ||
      !request.data.userId ||
      !request.data.journeyId
    ) {
      logger.log('fullName, challengeId or userId is missing');
      throw new Error('fullName, challengeId or userId is missing');
    }

    const { fullName, challengeId, journeyId, userId } = request.data;

    const certificate = await generateCertificate({ fullName, challengeId });

    const enrolledPlayerDocs = await admin
      .firestore()
      .collection('enrolledPlayers')
      .where('challengeId', '==', challengeId)
      .where('journeyId', '==', journeyId)
      .where('userId', '==', userId)
      .get();

    if (enrolledPlayerDocs.empty) {
      logger.log('enrolledPlayerRef is empty');
      throw new Error('enrolledPlayerRef is empty');
    }

    const enrolledPlayerDoc = enrolledPlayerDocs.docs[0];

    await enrolledPlayerDoc.ref.update({
      certificate: {
        pdfUrl: certificate.pdf_url,
        imageUrl: certificate.image_url,
      },
    });

    logger.log('certificate generated successfully');
    return { status: 'success' };
  } catch (error) {
    logger.log(error);
    throw new Error(
      'An error occurred while generating the certificate',
      error
    );
  }
});

module.exports = {
  generateCertificate,
  generateChallengeCertificate,
};
