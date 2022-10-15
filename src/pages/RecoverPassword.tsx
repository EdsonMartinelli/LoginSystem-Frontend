import { Button, Flex, Text, Heading, VStack } from "@chakra-ui/react";
import * as yup from "yup";
import { useState } from "react";
import { Formik } from "formik";
import { TextInputFormik } from "../components/TextInputFormik";
import { typeOrientationAuthAnimation } from "../interfaces/AnimatedAuth";

export function RecoverPassword({
  orientation,
}: {
  orientation: typeOrientationAuthAnimation;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

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
      setFormError("Fail");
    }, 3000);
  }

  return (
    <>
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
            <Heading height="40px">Forgot </Heading>
            <Heading height="90px">Your Password?</Heading>
            <form onSubmit={handleSubmit}>
              <VStack width="full" spacing={8}>
                <TextInputFormik name="email" placeholder="Email" />
                <Button
                  colorScheme="blue"
                  width="full"
                  type="submit"
                  isDisabled={!(isValid && dirty)}
                  isLoading={isLoading}
                >
                  Recover
                </Button>
                <Flex
                  width="full"
                  height="20px"
                  align="center"
                  justify="center"
                >
                  <Text fontSize="sm" color="red.500">
                    {formError}
                  </Text>
                </Flex>
              </VStack>
            </form>
          </>
        )}
      </Formik>
    </>
  );
}
