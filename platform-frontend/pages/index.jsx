import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import MainAppLayout from '@/layouts/MainAppLayout';
import FeaturedMissions from '@/templates/FeaturedMissions';

import CHALLENGES from '@/constants/challenges';

import { firestore } from '@/redux/store';
import fetchChallenges from '@/redux/thunks/challenges';

const Missions = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedMaskedId, setSelectedMaskedId] = useState(null);
  const enrolledChallenges = useSelector((state) => state.enrolledChallenges);
  const { data, loading, error } = useSelector(
    (state) => state.challenges.mission
  );

  useEffect(() => {
    dispatch(fetchChallenges({ firestore, challengeType: CHALLENGES.MISSION }));
  }, []);

  const handleContinueMission = () => {
    router.push(`/${selectedMaskedId}/dashboard`);
  };

  const toggleOpen = (maskId) => {
    setSelectedMaskedId(maskId);
    setOpen(!open);
  };

  return (
    <FeaturedMissions
      open={open}
      toggleOpen={toggleOpen}
      handleContinueMission={handleContinueMission}
      enrolledChallenges={enrolledChallenges}
      data={data}
      loading={loading}
      error={error}
    />
  );
};

Missions.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default Missions;
