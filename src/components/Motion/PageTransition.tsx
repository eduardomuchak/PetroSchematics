import { motion } from 'framer-motion';

function MotionPageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
      {children}
    </motion.div>
  );
}

export default MotionPageTransition;
