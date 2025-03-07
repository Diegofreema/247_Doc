import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { forwardRef } from 'react';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { toast } from 'sonner-native';
import * as StoreReview from 'expo-store-review';
type Props = {
  email: string;
  sessionFee: string;
  onInvalidate: () => void;
  paymentRef: string;
};

export const Payment = forwardRef<paystackProps.PayStackRef, Props>(
  ({ email, sessionFee, onInvalidate, paymentRef }, ref) => {
    const router = useRouter();
    const onReview = async () => {
      await StoreReview.requestReview();
    };
    return (
      <Paystack
        paystackKey="pk_live_34dcb421bb4e9e6f20fdf2c993f2b44c9e436fbe"
        billingEmail={email}
        amount={sessionFee}
        channels={[
          'card',
          'bank',
          'ussd',
          'mobile_money',
          'qr',
          'bank_transfer',
        ]}
        onCancel={(e) => {
          toast.info('You have been canceled payment');
        }}
        onSuccess={async (res) => {
          // handle response here
          await axios.post(
            `https://247doc.net/checkout.aspx?zxc=${paymentRef}`
          );
          toast.success('Payment was successful');

          onInvalidate();
          router.push('/two');
          await onReview();
        }}
        // @ts-ignore

        ref={ref}
      />
    );
  }
);
Payment.displayName = 'Payment';
