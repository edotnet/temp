import ReactJson from "react-json-view";
import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { useEffect } from "react";
import { Card } from "../../../infrastructure/components/Card";

export const Detail = (props) => {

  const {loading, data, error, fetch} = useApiCall(`eval?smiles=null`, 'GET', null, false);

  useEffect(() => {
    const smiles = "calculated_properties" in props.detail &&
    props.detail.calculated_properties &&
    "SMILES" in props.detail.calculated_properties ?
      props.detail.calculated_properties.SMILES :
      props.detail.SMILES;
    fetch(`eval?smiles=${smiles}`, 'GET');
  }, [props.detail]);

  return (
    <Card>
      {error && <div>Error checking smiles</div>}
      <ReactJson src={{...props.detail, ...data}} name={null} collapsed={false}/>
    </Card>
  );
}
