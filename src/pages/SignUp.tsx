import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Heading, useToast, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { CheckBoxFormik } from "../components/CheckBoxFormik";
import { FormButton } from "../components/FormButton";
import { PasswordInputFormik } from "../components/PasswordInputFormik";
import { TextInputFormik } from "../components/TextInputFormik";
import { typeOrientationAuthAnimation } from "../interfaces/AnimatedAuth";
import { APIServiceInstance } from "../services/APIService";
import { errorToast } from "../utils/errorToast";
import { successToast } from "../utils/successToast";

interface signUpProps {
  username: string;
  email: string;
  password: string;
  terms: boolean;
}

export function SignUp({
  orientation,
}: {
  orientation: typeOrientationAuthAnimation;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();
  const APIService = APIServiceInstance();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Username is too short!")
      .max(20, "Username is too long!")
      .required("Username is required!")
      .strict(true),
    email: yup
      .string()
      .email("Email is invalid!")
      .required("Email is required!")
      .strict(true),

    password: yup
      .string()
      .min(8, "Password is too short!")
      .max(16, "Password is too long!")
      .matches(/^(\S+$)/g, "Password is invalid!")
      .required("Password is required!")
      .strict(true),

    terms: yup.boolean().oneOf([true]),
  });

  function signUpHandler({ username, email, password, terms }: signUpProps) {
    setIsLoading(true);
    if (username != null && email != null && password != null && terms) {
      APIService.user
        .signUp({
          username,
          email,
          password,
        })
        .then((response: any) => {
          toast(successToast("Success in sign up!"));
          const userID: string = response?.user?.id ?? "";
          navigate(`/active/${userID}`, { state: { orientation } });
        })
        .catch((error: any) => {
          toast(errorToast(error?.message));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <div>
      <Heading height="60px">Sign Up</Heading>
      <Formik
        initialValues={{ email: "", password: "", username: "", terms: false }}
        onSubmit={(values) => {
          signUpHandler(values);
        }}
        validationSchema={validationSchema}
        initialErrors={{ email: "", password: "", username: "", terms: "" }}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <>
            <form onSubmit={handleSubmit}>
              <VStack id="form-stack" width="full" spacing={8}>
                <TextInputFormik name="username" placeholder="Username" />
                <TextInputFormik name="email" placeholder="Email" />
                <PasswordInputFormik name="password" placeholder="Password" />
                <CheckBoxFormik name="terms">
                  I agree with all Terms and Conditions
                </CheckBoxFormik>
                <FormButton
                  width="full"
                  rightIcon={<ArrowForwardIcon />}
                  type="submit"
                  isDisabled={!(isValid && dirty)}
                  isLoading={isLoading}
                >
                  Sign Up
                </FormButton>
                {/* <Flex
                  width="full"
                  height="20px"
                  align="center"
                  justify="center"
                >
                  <Text fontSize="sm" color="red.500">
                    {formError}
                  </Text>
                </Flex> */}
              </VStack>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
}
