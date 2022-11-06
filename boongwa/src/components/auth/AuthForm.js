import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../Button';

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

/**
 * 
 * 스타일링 된 input
 */
const StyledInput = styled.input`
    margin-top: 30px;
    font-size: 1rem;
    border: none;
    border: 2px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    height: 40px;
    border-radius: 5px;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

/**
 * 
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
    margin-top: 2rem;
    text-align: center;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

const ButtonWithMarginTop = styled(Button)`

    margin-top: 1rem;
`;

const textMap = {
    login: '로그인',
    register: '회원가입',
};

const AuthForm = ({ type, form, onChange, onSubmit }) => {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <form onSubmit={onSubmit}>
                {type === 'login' &&(
                <StyledInput
                    autoComplete="userid"
                    name="userid"
                    type="email"
                    onChange={onChange}
                    value={form.userid}
                    placeholder="아이디 입력" />  
                )}
                {type === 'login' &&(
                <StyledInput 
                    autoComplete="userpw" 
                    name="userpw" 
                    type="password"
                    onChange={onChange}
                    value={form.userpw}
                    placeholder="비밀번호 입력" />
                )}
                {type === 'register' && (
                    <StyledInput
                    autoComplete="username"
                    name="username"
                    type="text"
                    onChange={onChange}
                    value={form.username}
                    placeholder="이름 입력" />
                )}
                {type === 'register' && (
                <StyledInput
                    autoComplete="password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                    onChange={onChange}
                    value={form.password}
                    />
                )}
                {type === 'register' && (
                <StyledInput
                    autoComplete="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="비밀번호 확인"
                    type="password"
                    onChange={onChange}
                    value={form.passwordConfirm}
                    />
                )}
                {type === 'register' && (
                    <StyledInput
                    autoComplete="school"
                    name="school"
                    type="text"
                    placeholder="학교 입력"
                    onChange={onChange}
                    value={form.school} />
                )}
                {type === 'register' && (
                    <StyledInput
                    autoComplete="grade"
                    name="grade"
                    type="text"
                    onChange={onChange}
                    value={form.grade}
                    placeholder="학년 입력" />
                )}
                {type === 'register' && (
                    <StyledInput
                    autoComplete="college"
                    name="college"
                    type="text"
                    onChange={onChange}
                    value={form.college}
                    placeholder="단과대학 입력" />
                )}
                {type === 'register' && (
                    <StyledInput
                    autoComplete="major"
                    name="major"
                    type="text"
                    onChange={onChange}
                    value={form.major}
                    placeholder="학과 입력" />
                )}
                {type === 'register' && (
                    <StyledInput
                    autoComplete="school_id"
                    name="school_id"
                    type="text"
                    onChange={onChange}
                    value={form.school_id}
                    placeholder="학번 입력" />
                )}
                    <ButtonWithMarginTop fullWidth style={{ marginTop: '50px'}}>{text}</ButtonWithMarginTop>
            </form>
            <Footer>
                {type === 'login' ? (
                    <Link to="/register">회원가입</Link>
                ):(
                    <Link to="/login">로그인</Link>
                )}
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;