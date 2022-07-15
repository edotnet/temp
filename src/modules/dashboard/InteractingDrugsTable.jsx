import { fetchFromObject } from "../../infrastructure/utils";

export const InteractingDrugsTable = ({interactingMolecules}) => {
  const keys = [
    {key: 'calculated_properties.logP', title: 'LogP'},  // -9 / 9
    {key: 'calculated_properties.ALOGPS.logS', title: 'LogS'}, //-11 / 3
    {key: 'calculated_properties.Molecular Weight', title: 'Mass.'}, //900 / 1
    {key: 'calculated_properties.ADMET.ames_toxicity.probability', title: 'AMES Tox'},
    {key: 'calculated_properties.ADMET.caco2.probability', title: 'Caco2'},
    {key: 'calculated_properties.ADMET.hia.probability', title: 'HIA'},
    {key: 'calculated_properties.ADMET.bbb.probability', title: 'BBB'},
    {key: 'calculated_properties.ADMET.biodegradation.probability', title: 'Biodeg'},
  ]
  if (interactingMolecules.length < 2) {
    return null;
  }
  const [drug1, drug2] = interactingMolecules;
  return (
    <div>
      <div className="tempTooltips">
        <div className="tips-table">
          <div className="t-header t-row">
            <div>Property</div>
            <div style={{'position':'relative'}}>
              <div className="mlc-color-dot" style={{borderColor: `hsla(${drug1.color.hue},${drug1.color.saturation}%, ${drug1.color.luminosity}%, 0.7)`}}>
                <span style={{backgroundColor: `hsla(${drug1.color.hue},${drug1.color.saturation}%, ${drug1.color.luminosity}%, 0.7)`}}></span>
              </div>
              <span style={{paddingLeft: '20px'}}>{drug1.name? drug1.name : 'Molecular Name'}</span>
            </div>
            <div style={{'position':'relative'}}>
              <div className="mlc-color-dot" style={{borderColor: `hsla(${drug2.color.hue},${drug2.color.saturation}%, ${drug2.color.luminosity}%, 0.7)`}}>
                <span style={{backgroundColor: `hsla(${drug2.color.hue},${drug2.color.saturation}%, ${drug2.color.luminosity}%, 0.7)`}}></span>
              </div>
              <span style={{paddingLeft: '20px'}}>{drug2.name? drug2.name : 'Molecular Name'}</span>
            </div>
          </div>
          <div className="drug1-row body-row">
            <div className="properties">
              <div>LogP</div>
              <div>LogS</div>
              <div>Mass</div>
              <div>AMES tox.</div>
              <div>CACO2 Prob.</div>
              <div>BBB</div>
              <div>HIA</div>
              <div>Biodegradation</div>
            </div>
            <div className="drugvalues">
              {keys.map(key => (
                <div key={key.key}>{fetchFromObject(drug1, key.key)}</div>
              ))}
            </div>
            <div className="drugvalues2">
              {keys.map(key => (
                <div key={key.key}>{fetchFromObject(drug2, key.key)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
