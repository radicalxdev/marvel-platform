import { useState } from 'react';

import { useRouter } from 'next/router';

import MainAppLayout from '@/layouts/MainAppLayout';
import FeaturedMissions from '@/templates/FeaturedMissions';

const Missions = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedMaskedId, setSelectedMaskedId] = useState(null);

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
    />
  );
};

Missions.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default Missions;
