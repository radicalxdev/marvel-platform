import { AnimatePresence, motion } from 'framer-motion';

const FadeTransition = ({ children, key }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default FadeTransition;
