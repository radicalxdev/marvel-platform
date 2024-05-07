import { useContext, useState } from 'react';

import { createCheckoutSession } from '@invertase/firestore-stripe-payments';
import { Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import GreenCheckmark from '@/assets/svg/green-checkmark.svg';

import ALERT_COLORS from '@/constants/notification';
import {
  PAYMENT_INTERVALS,
  PAYMENT_PLAN_BANNERS,
  PAYMENT_PLANS,
} from '@/constants/plans';

import GradientOutlinedButton from '../GradientOutlinedButton';

import styles from './styles';

import { AuthContext } from '@/providers/GlobalProvider';
import { payments } from '@/redux/store';
import createPortalLink from '@/services/user/createStripePortalLink';
import { formatStripeAmount } from '@/utils/IntegrationUtils';

/**
 * Generates a card component to display different prices for a particular product.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.name - The name of the product.
 * @param {string} props.description - The description of the product.
 * @param {string} props.role - The role of the product.
 * @param {Array} props.prices - The prices of the product.
 * @param {Object} props.metadata - The metadata of the product.
 * @param {Array} props.images - The images of the product.
 * @param {Array} props.subscriptions - The subscriptions of the product.
 * @return {JSX.Element} The product card component.
 */
const ProductCard = (props) => {
  const {
    description,
    role,
    prices,
    metadata,
    isMiddleCard,
    subscriptions,
    currentInterval,
  } = props;

  const theme = useTheme();

  const { handleOpenSnackBar } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const claims = useSelector((state) => state.auth.data?.claims);

  const { included, gemsPerMonth, feedback, management, access } = metadata;

  const noSubs = subscriptions.length === 0 || !subscriptions;
  const currentPrice = prices?.find(
    (price) => price.interval === currentInterval
  );
  const subscribed = subscriptions?.some(
    (sub) => sub.price === currentPrice?.id
  );
  const currentSubscription = subscriptions?.[0];
  const subscriptionPrice = prices?.find(
    (price) => price.id === currentSubscription?.price
  );
  const isMonthlyInterval = currentInterval === PAYMENT_INTERVALS.MONTHLY;

  const planColor = {
    lite: 'orange',
    pro: 'red',
    ultra: 'blue',
  };

  if (role === PAYMENT_PLANS.FREE) return null;

  const handleCreatePortalLink = async () => {
    try {
      setLoading(true);
      const portalLink = await createPortalLink();

      setLoading(false);
      window.open(
        subscribed
          ? portalLink
          : `${portalLink}/subscriptions/${subscriptions[0].id}/update`,
        '_blank'
      );
    } catch (error) {
      setLoading(false);
      handleOpenSnackBar(ALERT_COLORS.ERROR, error.message);
    }
  };

  const handleCheckoutSession = async () => {
    setLoading(true);
    try {
      const session = await createCheckoutSession(payments, {
        price: currentPrice?.id,
        quantity: 1,
      });

      setLoading(false);
      window.open(session.url, '_blank');
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  const handleButtonClick = () => {
    if (noSubs && role === PAYMENT_PLANS.FREE) return handleCheckoutSession();
    return handleCreatePortalLink();
  };

  const setButtonText = () => {
    if (loading) return null;
    if (subscribed) return 'Manage Current Plan';
    if (claims?.stripeRole === PAYMENT_PLANS.FREE) return `Upgrade to ${role}`;

    if (subscriptionPrice?.unit_amount < currentPrice?.unit_amount)
      return `Upgrade to ${role}`;

    return `Downgrade to ${role}`;
  };

  const renderImage = () => {
    return (
      <Grid {...styles.imageGridProps}>
        <Image src={PAYMENT_PLAN_BANNERS[role]} {...styles.imageProps} />
      </Grid>
    );
  };

  const renderPrice = () => {
    return (
      <Grid {...styles.priceGridProps}>
        <Typography {...styles.priceProps}>
          {`${formatStripeAmount(currentPrice?.unit_amount)} `}
          <span>USD/{isMonthlyInterval ? 'mo' : 'yr'}</span>
        </Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
      </Grid>
    );
  };

  const renderButton = () => {
    return (
      <Grid {...styles.buttonGridProps}>
        <GradientOutlinedButton
          text={setButtonText()}
          bgcolor="#0D1014"
          loading={loading}
          clickHandler={handleButtonClick}
          {...styles.buttonProps}
        />
      </Grid>
    );
  };

  const renderTitle = () => {
    return (
      <Typography
        {...styles.titleProps(
          `Radical ${role} ${!isMonthlyInterval ? 'Team' : ''}`
        )}
      >
        Radical{' '}
        <Typography
          component="span"
          sx={{
            color: theme.palette.Background[planColor[role]],
            fontSize: 'inherit',
            fontFamily: 'inherit',
          }}
        >
          {role}
        </Typography>
        {!isMonthlyInterval && ' Team'}
      </Typography>
    );
  };

  const renderDescription = () => {
    return (
      <Grid {...styles.descriptionGridProps}>
        <Grid {...styles.descriptionTitleGridProps}>
          <Typography {...styles.descriptionTitleProps}>{included}</Typography>
        </Grid>
        <Grid {...styles.detailGridProps}>
          <GreenCheckmark />
          <Typography {...styles.detailTextProps}>{gemsPerMonth}</Typography>
        </Grid>
        <Grid {...styles.detailGridProps}>
          <GreenCheckmark />
          <Typography {...styles.detailTextProps}>{feedback}</Typography>
        </Grid>
        <Grid {...styles.detailGridProps}>
          <GreenCheckmark />
          <Typography {...styles.detailTextProps}>{management}</Typography>
        </Grid>
        <Grid {...styles.detailGridProps}>
          <GreenCheckmark />
          <Typography {...styles.detailTextProps}>{access}</Typography>
        </Grid>
        {renderButton()}
      </Grid>
    );
  };

  const renderContent = () => {
    return (
      <Grid {...styles.contentGridProps}>
        {renderPrice()}
        {renderDescription()}
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps(isMiddleCard)}>
      <Grid {...styles.outerCardGridProps(subscribed)}>
        <Grid {...styles.mainCardGridProps}>
          {renderTitle()}
          {renderImage()}
          {renderContent()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductCard;
