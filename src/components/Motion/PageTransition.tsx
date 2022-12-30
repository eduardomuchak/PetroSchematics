import { chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = chakra(motion.div);

function MotionPageTransition({ children }: { children: React.ReactNode }) {
  return (
    <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
      {children}
    </MotionBox>
  );
}

export default MotionPageTransition;
