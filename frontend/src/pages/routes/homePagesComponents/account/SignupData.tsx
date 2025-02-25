import { Dispatch, SetStateAction, FC, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import SignupDataBirthdate from "./signupData/SignupDataBirthdate";
import SignupDataEmail from "./signupData/SignupDataEmail";
import SignupDataFirstname from "./signupData/SignupDataFirstname";
import SignupDataLastname from "./signupData/SignupDataLastname";
import SignupDataPassword from "./signupData/SignupDataPassword";
import SignupDataUsername from "./signupData/SignupDataUsername";

type Props = {
  setReload: Dispatch<SetStateAction<boolean>>;
};

const SignupData: FC<Props> = ({}) => {
  const [signupRow, setSignupRow] = useState<string | null>(null);

  return (
    <>
      <div className='signup_data_container'>
        <div className='signup_data_title'>
          Modifier vos données personnelles
        </div>
        <div className='signup_data_row'>
          <div
            className='signup_data_row_title'
            onClick={() => setSignupRow('firstname')}
          >
            <div className='signup_data_row_title_text'>Prenom : </div>
            <div className='signup_data_row_title_icon'>
              {signupRow === 'firstname' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {signupRow === 'firstname' && <SignupDataFirstname />}
        </div>
        <div className='signup_data_row'>
          <div
            className='signup_data_row_title'
            onClick={() => setSignupRow('lastname')}
          >
            <div className='signup_data_row_title_text'>Nom :</div>
            <div className='signup_data_row_title_icon'>
              {signupRow === 'lastname' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {signupRow === 'lastname' && <SignupDataLastname />}
        </div>
        <div className='signup_data_row'>
          <div
            className='signup_data_row_title'
            onClick={() => setSignupRow('username')}
          >
            <div className='signup_data_row_title_text'>
              Nom d'utilisateur :
            </div>
            <div className='signup_data_row_title_icon'>
              {signupRow === 'username' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {signupRow === 'username' && <SignupDataUsername />}
        </div>
        <div className='signup_data_row'>
          <div
            className='signup_data_row_title'
            onClick={() => setSignupRow('email')}
          >
            <div className='signup_data_row_title_text'>Adresse e-mail :</div>
            <div className='signup_data_row_title_icon'>
              {signupRow === 'email' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {signupRow === 'email' && <SignupDataEmail />}
        </div>
        <div className='signup_data_row'>
          <div
            className='signup_data_row_title'
            onClick={() => setSignupRow('birthdate')}
          >
            <div className='signup_data_row_title_text'>
              Date de naissance :
            </div>
            <div className='signup_data_row_title_icon'>
              {signupRow === 'birthdate' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {signupRow === 'birthdate' && <SignupDataBirthdate />}
        </div>
        <div className='signup_data_row'>
          <div
            className='signup_data_row_title'
            onClick={() => setSignupRow('password')}
          >
            <div className='signup_data_row_title_text'>Mot de passe :</div>
            <div className='signup_data_row_title_icon'>
              {signupRow === 'password' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {signupRow === 'password' && <SignupDataPassword />}
        </div>
      </div>
    </>
  );
};

export default SignupData;
