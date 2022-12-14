import { Heading, VStack, Text, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { FormButton } from "../components/FormButton";
import { TextInputFormik } from "../components/TextInputFormik";
import { APIErrorProps } from "../interfaces/http/errors/APIErrorProps";
import { IUserHttpClient } from "../interfaces/http/IUserHttpClient";
import { AssertAPIError } from "../utils/APIErrorPropsAssert";
import { errorToast } from "../utils/errorToast";
import { successToast } from "../utils/successToast";

interface confirmEmailProps {
  userHttpClient: IUserHttpClient;
}

export function ConfirmEmail({ userHttpClient }: confirmEmailProps) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const validationSchema = yup.object().shape({
    code: yup
      .string()
      .required("Code is required!")
      .length(6, "Code must have 6-digits")
      .strict(true),
  });

  function confirmEmailHandler({ code }: { code: string }) {
    setIsLoading(true);
    userHttpClient
      .validateEmail({ id: id ?? "", emailToken: code })
      .then((response) => {
        toast(successToast("Account validate with success"));
      })
      .catch((error: any) => {
        const errorAssert: APIErrorProps = AssertAPIError(error);
        toast(
          errorToast({
            message: errorAssert.message,
            status: errorAssert.status,
          })
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Heading height="120px">Confirm Your Email</Heading>
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
            <Text height="40px">Enter the code we sent to your email</Text>
            <form onSubmit={handleSubmit}>
              <VStack width="full" spacing={8}>
                <TextInputFormik
                  nameLabel="Code"
                  name="code"
                  placeholder="Enter your Code"
                />
                <FormButton
                  width="full"
                  type="submit"
                  isDisabled={!(isValid && dirty)}
                  isLoading={isLoading}
                >
                  Confirm
                </FormButton>
              </VStack>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
}
