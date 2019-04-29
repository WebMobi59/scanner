import styled from 'styled-components/native'
import { Metrics, Fonts } from '@Themes'

export const Wrapper = styled.View`
    position: relative;
    align-items: center;
    height: ${Metrics.screenHeight};
`;

export const ImageWrapper = styled.View`
    width: 29px;
    height: 28px;
    margin-top: 41px;
`;

export const BarcodeImage = styled.Image`
    width: 100%;
    height: 100%;
`;

export const WelcomeTextWrapper = styled.View`
    margin: 0 100px;
    flex-direction: row;
`;

export const WelcomeText = styled.Text`
    flex: 1;
    flex-wrap: wrap;
    margin-top: 14px;
    color: #1f2952;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.7;
    font-family: ${Fonts.type.bold};
    text-align: center;
`;

export const SelectText = styled.Text`
    margin-top: 15px;
    margin-bottom: 34px;
    color: #1f2952;
    font-family: ${Fonts.type.base};
    font-weight: 400;
    font-size: 16px;
`;

export const SelectOption = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 320px;
    height: 106px;
    margin-bottom: 25px;
    padding: 0 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    border: 1px solid #eaeaea;
    background-color: #ffffff;
`;

export const SelectImageWrapper = styled.View`
    width: ${props => props.width};
    height: ${props => props.height};
`;

export const OptionImage = styled.Image`
    width: 100%;
    height: 100%;
`;

export const DescriptionWrapper = styled.View`

`;

export const UpText = styled.Text`
    width: 150px;
    margin-top: 2px;
    color: #1f2952;
    font-family: ${Fonts.type.bold};
    font-size: 16px;
    font-weight: 700;
`;

export const BottomText = styled.Text`
    color: #1f2952;
    font-family: ${Fonts.type.base};
    font-size: 12px;
    font-weight: 400;
`;

export const ArrowImageWrapper = styled.View`
    width: 7px;
    height: 14px;
`;

export const ArrowImage = styled.Image`
    width: 100%;
    height: 100%;
`;

export const ExplanationText = styled.Text`
    position: absolute;
    color: #1f2952;
    font-family: ${Fonts.type.base};
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    bottom: 73;
`;