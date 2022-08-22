import styled from "styled-components";

export const StyledNotification = styled.section`
${'' /* background-color: ${(props) =>
  props.success
    ? "#7ece7e"
    : props.warning
    ? "#ffdb9b"
    : props.error
    ? "#f6a698"
    : ""}
border-left: ${(props) =>
  props.success
    ? "8px solid #147514"
    : props.warning
    ? "8px solid #ffa502"
    : props.error
    ? "8px solid #f84f31"
    : ""} */}
  margin-bottom: 10px;
  padding: 10px 40px;
  min-width: 260px;
  border-radius: 4px;
  overflow: hidden;
  opacity: 1;
  pointer-events: auto;
  animation: show_slide 1s ease forwards;


  @keyframes show_slide {
    0% {
      transform: translateX(100%);
    }
    40% {
      transform: translateX(-10%);
    }
    80% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-10px);
    }
  }

  .notification--warning {
    background-color: #ffdb9b;
    border-left: 8px solid #ffa502;
  }
  .notification--success {
    background-color: #7ece7e;
    border-left: 8px solid #147514;
  }
  .notification--error {
    background-color: #f6a698;
    border-left: 8px solid #f84f31;
  }

  .notification__icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .notification__msg {
    padding: 0 20px;
    font-size: 18px;
  }

  .notification__msg--warning {
    color: #ce8500;
  }
  .notification__msg--success {
    color: #036803;
  }
  .notification__msg--error {
    color: #a63724;
  }

  .notification__close-btn {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    padding: 20px 18px;
    cursor: pointer;
  }

  .notification__close-btn--warning {
    color: #ffd080;
  }
  .notification__close-btn--success {
    color: #4baa4b;
  }
  .notification__close-btn--error {
    color: #a63724;
  }

  .notification-close__btn-icon {
    font-size: 22px;
    line-height: 40px;
  }
`;

export const NotificationWrapper = styled.section`
  position: fixed;
  top: 65px;
  right: 10px;
  z-index: 1000;
`