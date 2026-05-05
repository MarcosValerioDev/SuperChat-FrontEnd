'use client';
export default function MessageOther({ name, message }) {
  return (
    <div className={"boxMessageOther"}>
      <span className={"nameMessage"}>{name}</span>
      <div className={"messageText"}>{message}</div>
    </div>
  )
}