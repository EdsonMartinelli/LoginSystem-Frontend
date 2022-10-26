import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Heading, Link, VStack, Text, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FormButton } from "../components/FormButton";
import { PasswordInputFormik } from "../components/PasswordInputFormik";
import { TextInputFormik } from "../components/TextInputFormik";
import { useAuth } from "../hooks/useAuth";
import { typeOrientationAuthAnimation } from "../interfaces/AnimatedAuth";
import { errorToast } from "../utils/errorToast";

export function Login({
  orientation,
}: {
  orientation: typeOrientationAuthAnimation;
}) {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const validationSchema = yup.object().shape({
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
  });

  function loginHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    if (email != null && password != null) {
      const loginInfo = {
        email,
        password,
      };
      userLogin(loginInfo)
        .then(() => {
          navigate("/profile");
        })
        .catch((error: any) => {
          toast(
            errorToast({
              message: error.message,
              status: error.cause.status,
            })
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <div>
      <Heading height="60px">Login</Heading>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          loginHandler(values);
        }}
        validationSchema={validationSchema}
        initialErrors={{ email: "", password: "" }}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <form onSubmit={handleSubmit}>
            <VStack width="full" spacing={7}>
              <TextInputFormik
                nameLabel="Email"
                name="email"
                placeholder="Enter your Email"
              />

              <PasswordInputFormik
                nameLabel="Password"
                name="password"
                placeholder="Enter your Password"
              />
              <VStack width="full" spacing={3}>
                <Flex width="full" height="22px" align="flex-end" justify="end">
                  <Text fontSize="xs" zIndex="2">
                    <Link
                      as={NavLink}
                      to={{ pathname: "/recover" }}
                      state={{ orientation }}
                    >
                      Forgot your password?
                    </Link>
                  </Text>
                </Flex>

                <FormButton
                  width="full"
                  rightIcon={<ArrowForwardIcon />}
                  type="submit"
                  isDisabled={!(isValid && dirty)}
                  isLoading={isLoading}
                >
                  Login
                </FormButton>
              </VStack>
            </VStack>
          </form>
        )}
      </Formik>
    </div>
  );
}
