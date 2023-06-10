import styled from "styled-components";
import backgroundImg from "../../assets/background.png";

export const Container = styled.div`
height: 100vh;
display: flex;
align-items: stretch;



>.login{
margin-top: 4rem;
padding: 0 13.6rem 0 9.6rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
}
`;

export const Form = styled.form`
>h1{
font-size: 4.8rem;
font-weight: 700;
color: ${({theme}) => theme.COLORS.PINK};
}

p{
font-size: 1.4rem;
font-weight: 400;
color: ${({theme}) => theme.COLORS.GRAY_808};
margin-bottom: 4.8rem;
}

h2{
font-size: 2.4rem;
font-weight: 500;
color: ${({theme}) => theme.COLORS.WHITE};
margin-bottom: 4.8rem;
}

Button{
margin-bottom: 4rem;
}
`;

export const Background = styled.div`
flex: 2;
background: url(${backgroundImg}) no-repeat center center;
background-size: cover;
`;