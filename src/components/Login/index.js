import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';
import styled from 'styled-components';
import bgrlogin from '../../images/bgrlogin.jpg';

const { Title } = Typography;

const Wrapper = styled(Row)`
  background-image: url(${bgrlogin});
  background-size: cover;
  height: 100vh;
`
const Block = styled(Col)`
  margin-top :150px
`
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const handleLogin = async (provider) => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);//tạo hàm login để xử lý 
      console.log(additionalUserInfo)
    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase()),
      });
    }
  };

  return (
    <div>
      <Wrapper justify='center' >
        <Block span={8}>
          <Title style={{ textAlign: 'center' }} level={3}>
            Chat App - Company 
          </Title>
          <Button
            style={{ width: '100%', marginBottom: 5 }}
            onClick={() => handleLogin(googleProvider)}
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            style={{ width: '100%' }}
            onClick={() => handleLogin(fbProvider)}
          >
            Đăng nhập bằng Facebook
          </Button>
        </Block>
      </Wrapper>
    </div>
  );
}