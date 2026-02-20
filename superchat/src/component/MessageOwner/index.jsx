'use client';
export default function MessageOwner({ name, message }) {
  return (
    <div className={"boxMessage"}>
      {/* <span className={"nameMessage"}>{name}</span> */}
      <div className={"messageText"}>{message}</div>
    </div>
  )
}