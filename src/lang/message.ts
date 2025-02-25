const success = {
  getPatientDetailRetriveSuccessFully:
    'Patient details retrieved successfully.',
  getUserDataRetriveSuccessFully: 'User data retrieved successfully.',
  signInSuccessFully: 'User login successfully.',
  signUpSuccessFully: 'User register successfully.',
  ClientAddSuccessFully: 'Client Add successfully.',
  viewProfileSuccessFully: 'User profile detail retrieved successesfully.',
  otpVerifySuccessFully: 'OTP verify successesfully.',
  LinkVerifySuccessFully: 'Link verify successesfully.',
  userEditSuccessFully: 'Profile update successfully.',
  docUploadSuccessFully: 'Document upload successfully.',
  docDeleteSuccessFully: 'Document delete successfully.',
  userDeletSuccessFully: 'User Deleted successesfully.',
  getPasswordResetSuccessfully: 'Password reset successfully.',
  forgetPasswordSuccessfully:
    'Email sent to this Email adress for reset Password.',
  relationDataSuccessfully: 'Relation types retrived',
  relationUpdateSuccessfully:
    'Relation with family member is updated successfully',
  familyLinkSuccessfully: 'Family member link successfull',
  familymemberSuccessfully: 'Family member find successfull',
  showFamily: 'Show Patient family member Successfully.',
  sendMail: 'Mail send Successfully.',
  resendMail: 'Please check your Mail for resend OTP Successfully.',
};

const error = {
  somethingWentWrongError: 'Oops! Something went wrong, Please try again.',
  fileIsMissingError: 'File is missing!',
  imageNotProper: 'Please provide proper image.',
  relationNotFoundError: 'Relations not find!!',
  familyMemberLinkedAlready: 'Family member is linked already',
  familyLinkError: 'Family member is not linked!',
  relationUpdateError: 'Relation with family member is not updated.',
  memberNotFoundError: 'Family member is not found',
  relationFamilyNotFoundError: 'Relation with family member is not found',
  fileNotFoundError: 'File not found!',
  otpNotFound: 'Please Enter the OTP.',
  UrlNotFound: 'Please Enter the URL.',
  bodyMissingError: 'Body is missing, please enter values',
  otpNotVerify: 'Your Entered OTP is not verfiy.',
  unauthorizedError: 'You are not authorized',
  signupError:
    'Registration was failed due to a technical issue, Please try again after some time.',
  notRegisteredError:
    'You are not registered user. Please register yourself to access.',
  wrongPasswordError:
    'The password you have entered was wrong. Please try with correct password.',
  wrongOtpError:
    'The OTP you have entered was wrong. Please try with correct OTP.',
  wrongUrlError:
    'The URL you have entered was wrong. Please try with correct URL.',
  newPasswordEmpty: 'New Password can not be empty.',
  alreadyExistsError:
    'The mail you have entered was already Registered. Please try another mail id.',
  usernamealreadyExistsError:
    'The username you have entered was already Registered. Please try another username.',
  passwordCannotBeSameError:
    'You can not set new password same as old password.',
  passwordNotFoundError:
    'You can not set new password Please set your Password.',
  emailNotFoundError:
    'User does not exists with this email! Please enter valid Email',
  uuidNotFoundError: 'Your UUID not found',
  emailRequiredError: 'Email is Required',
  tokenNotFound: 'Something went wrong, Please try after some time.',
  invalidAuthorizationToken: 'Invalid Authorization Token',
  unauthorizedaccess: 'You do not have any authorization to access this file',
  tokenIsRequired: 'Authorization token is required',
  invalidAuthorizationSchema: 'Invalid Authorization Token schema',
  patientNoteUpdate: 'Document is not uploaded.',
  wrongOldPasswordError: 'Please Enter correct OldPassword',
  familyLinkNotSameError: 'Patinent id and family member id will not be same',
  sameSearchError: 'You can not link your self as family member',
  UserNotFound: 'User detail not found.',
};

const subject = {
  welcomeToAHS: 'Welcome.',
};

const smsContent = {
  welcome: `Hello #CUSTOMER_NAME,
  Your password is #PASSWORD
  Please use above credentials to login in Advance Health System site #ADVANCE_HEALTH_SYSYTEM_PATIENT_SITE_URL. If you have any queries, please connect with us on #GOOGLE_FORM_LINK.
  
  Cheers,
  Advance Health System Team.`,
};
export default {
  success,
  error,
  subject,
  smsContent,
};
