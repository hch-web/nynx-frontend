export default function useUploadFile({ event, values, setFieldValue, name }) {
  const files = [...event.target.files];

  if (values?.name?.length > 0) {
    setFieldValue(name, [...values.name, ...files]);
  } else {
    setFieldValue(name, files);
  }
  return null;
}
