import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AlertMessage = ({ alertMessage }) => {
  if (!alertMessage.message) return null;

  return (
    <Alert
      variant={alertMessage.type === 'error' ? 'destructive' : 'default'}
      className="mb-6"
    >
      <AlertDescription>{alertMessage.message}</AlertDescription>
    </Alert>
  );
};

export default AlertMessage;
