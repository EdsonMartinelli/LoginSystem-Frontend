import { Button, Flex, Heading, VStack, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { TextInputFormik } from "../components/TextInputFormik";

export function ConfirmEmail() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const validationSchema = yup.object().shape({
    code: yup
      .string()
      .required("Code is required!")
      .length(6, "Code must have 6-digits")
      .strict(true),
  });

  function confirmEmailHandler({ code }: { code: string }) {
    setIsLoading(true);
    setTimeout(() => {
      console.log(code);
      setIsLoading(false);
      setFormError("Fail");
    }, 3000);
  }

  return (
    <>
      <Formik
        initialValues={{ code: "" }}
        onSubmit={(values) => {
          confirmEmailHandler(values);
        }}
        validationSchema={validationSchema}
        initialErrors={{ code: "" }}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <>
            <Heading height="40px">Confirm </Heading>
            <Heading height="80px">Your Email</Heading>
            <Text height="40px">Enter the code we sent to your email</Text>
            <form onSubmit={handleSubmit}>
              <VStack width="full" spacing={8}>
                <TextInputFormik name="code" placeholder="Code" />
                <Button
                  colorScheme="red"
                  width="full"
                  type="submit"
                  isDisabled={!(isValid && dirty)}
                  isLoading={isLoading}
                >
                  Confirm
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
