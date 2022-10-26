import { Heading, VStack } from "@chakra-ui/react";
import * as yup from "yup";
import { useState } from "react";
import { Formik } from "formik";
import { TextInputFormik } from "../components/TextInputFormik";
import { typeOrientationAuthAnimation } from "../interfaces/AnimatedAuth";
import { FormButton } from "../components/FormButton";

export function RecoverPassword({
  orientation,
}: {
  orientation: typeOrientationAuthAnimation;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email is invalid!")
      .required("Email is required!")
      .strict(true),
  });

  function recoverPasswordHandler({ email }: { email: string }) {
    setIsLoading(true);
    setTimeout(() => {
      console.log(email);
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div>
      <Heading height="40px">Forgot </Heading>
      <Heading height="90px">Your Password?</Heading>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          recoverPasswordHandler(values);
        }}
        validationSchema={validationSchema}
        initialErrors={{ email: "" }}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <>
            <form onSubmit={handleSubmit}>
              <VStack width="full" spacing={10}>
                <TextInputFormik
                  nameLabel="Email"
                  name="email"
                  placeholder="Enter your Email"
                />
                <FormButton
                  width="full"
                  type="submit"
                  isDisabled={!(isValid && dirty)}
                  isLoading={isLoading}
                >
                  Recover
                </FormButton>
              </VStack>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
}
