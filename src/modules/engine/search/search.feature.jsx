import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Endpoints } from '../../../config/Consts';
import { CircularProgressComponent } from '../../../infrastructure/components/CircularProgress.component';
import { encodeQuery, useApiCall } from '../../../infrastructure/hooks/useApiCall';
import { useDashboardContext } from '../../dashboard/context/useDashboarContext';
import { dockingFetcher } from '../../dashboard/DockingFetcher';
import { DrugProperties } from '../../dashboard/DrugProperties';
import { useEngineContext } from '../useEngineContext';
import { DrugLiterature } from './DrugLiterature';
import { DrugResults } from './DrugResults';
import { DrugSynthesis } from './DrugSynthesis';
import { NaturalProductsResults } from './NaturalProductsResults';
import { ProteinResults } from './ProteinResults';
import './search.scss';
import { SearchInput } from './SearchInput';
import { SectionTitle } from './SectionTitle';
import { TargetLiterature } from './TargetLiterature';

export const SearchFeature = () => {
  const {loading, data, fetch} = useApiCall(Endpoints.search.drug, 'POST', null, false);
  const {state: dashboardState, dispatch: dashboardDispatch} = useDashboardContext();
  const {state, dispatch} = useEngineContext();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [clickedRow, setClickedRow] = useState('');
  const [secondaryLoader, setSecondaryLoader] = useState(false);

  const {drugs, naturalProducts, targets, suggestions} = useMemo(() => {
    const keys = {
      drug: 'drugs',
      natural_product: 'naturalProducts',
      protein: 'targets',
    };
    const res = {
      drugs: [],
      naturalProducts: [],
      targets: [],
      suggestions: [],
    };
    if (data) {
      if (data.results) {
        data.results.forEach(item => {
          res[keys[item.type]].push(item);
        });
      }
      if (data.suggestions) {
        res.suggestions = data.suggestions;
      }
    }
    return res;
  }, [data]);

  const isNotFound = useMemo(
    () => !state.drugs.length && !state.targets.length && !state.naturalProducts.length && loading === false,
    [loading, state.drugs.length, state.targets.length, state.naturalProducts.length]
  )

  const notFoundValue = useMemo(() => (isNotFound ? searchText : ''), [isNotFound])

  const onRun = useCallback((searchTerm) => {
    fetch(Endpoints.search.drug, 'POST', {query: searchTerm ?? searchText});
  }, [searchText]);

  const sortedSuggestions = useMemo(() => suggestions.sort((a,b) => a.distance - b.distance), [suggestions])

  const drugHandleClick = useCallback((data) => {
    dispatch({type: 'setSelectedDrug', payload: data});
  }, [dispatch]);

  const dispatchDocking = useCallback(() => {
    if (dashboardState.pdbid) {
      dashboardState.molecules.forEach(molecule => {
        dockingFetcher(dashboardState.pdbid, molecule, dashboardDispatch, dashboardState.esmfold?.pdbPath, dashboardState.esmfold?.pdbId);
      });
    }
  }, [dashboardState.pdbid, dashboardDispatch, state.molecules]);

  const uploadSelectedDrugs = useCallback(() => {
    return new Promise((resolve, reject) => {
      const promises = [];
      if (!state.drugSelection.length) {
        resolve();
        return;
      }
      state.drugSelection.forEach(drug => {
        const url = `${Endpoints.drugbank.drugs}${encodeQuery(drug)}?exact=1`;
        promises.push(axios.get(url));
      });
      setSecondaryLoader(true);
      Promise.all(promises).then((responses) => {
        const molecules = [];
        responses.forEach((resp, drugIndex) => {
          if (resp.data) {
            resp.data.items.forEach((item) => {
              if ('name' in item && state.drugSelection.map(el => el.toLowerCase()).includes(item.name.toLowerCase())) {
                molecules.push(item);
              }
            });
          }
        });
        dashboardDispatch({type: 'addMolecules', payload: molecules});
        dashboardDispatch({type: 'resetInteractingMolecules', payload: null});
        dispatchDocking();
        setSecondaryLoader(false);
        resolve();
      }).catch(reject);
    });
  }, [state.drugSelection, dashboardDispatch, dispatchDocking]);

  const uploadSelectedNaturalProducts = useCallback(() => {
    return new Promise((resolve, reject) => {
      const promises = [];
      if (!state.naturalProductSelection.length) {
        resolve();
        return;
      }
      state.naturalProductSelection.forEach(naturalProduct => {
        const url = `${Endpoints.naturalProducts.query}${encodeQuery(naturalProduct)}?exact=1`;
        promises.push(axios.get(url));
        setSecondaryLoader(true);
        Promise.all(promises).then((responses) => {
          const molecules = [];
          responses.forEach((resp, drugIndex) => {
            if (resp.data) {
              resp.data.items.forEach((item) => {
                if ('cn' in item && state.naturalProductSelection.map(el => el.toLowerCase()).includes(item.cn.toLowerCase())) {
                  const molecule = {
                    name: item.cn,
                    drugbank_id: item.UNPD_ID,
                    calculated_properties: {
                      SMILES: item.SMILES,
                      ...item,
                      'Moleculer Formula': resp.data.items[0].mf,
                    },
                    toxicity: item.toxicity,
                  };
                  molecules.push(molecule);
                }
              });
            }
          });
          dashboardDispatch({type: 'addMolecules', payload: molecules});
          dashboardDispatch({type: 'resetInteractingMolecules', payload: null});
          dispatchDocking();
          setSecondaryLoader(false);
          resolve();
        }).catch(reject);
      });
    });
  }, [state.naturalProductSelection, state.molecules, dashboardDispatch, dashboardState.pdbid, navigate]);

  const uploadSelectedProtein = useCallback(() => {
    return new Promise((resolve, reject) => {
      const url = `${Endpoints.proteins.name}?criteria=${encodeQuery(state.targetSelection[0])}&exact=1`;
      const target = state.targets.find(target => target.name.toLowerCase() === state.targetSelection[0]);
      const organismUrl = `${Endpoints.proteins.organisms}?organismCriteria=${encodeQuery(target.organism)}&exact=1&name=${encodeQuery(target.name)}`;
      const organismCall = target.organism ? axios.get(organismUrl) : new Promise(resolve => resolve({data: null}));
      Promise.all([axios.get(url), organismCall]).then(([proteins, organisms]) => {
        if (proteins.data) {
          dashboardDispatch({type: 'addProtein', payload: proteins.data.items[0]});
          if (organisms.data) {
            dashboardDispatch({type: 'addOrganism', payload: organisms.data.items[0]});
          }
          dashboardDispatch({type: 'resetInteractingMolecules', payload: null});
          dashboardDispatch({type: 'removePdb', payload: null});
          resolve();
        }
      }).catch(reject);
    });
  }, [state.targetSelection, state.targets, dashboardDispatch]);

  const uploadSelectedProteinDrugs = useCallback(() => {
    Promise.all([uploadSelectedProtein(),
      uploadSelectedDrugs(),
      uploadSelectedNaturalProducts(),
      uploadSelectedProtein()
    ]).then(() => {
      navigate('/dashboard');
    });
  }, [uploadSelectedProtein, uploadSelectedDrugs, uploadSelectedNaturalProducts, navigate]);

  const uploadDrugsAndNavigate = useCallback(
    () => {
      uploadSelectedDrugs().then(() => {
        navigate('/dashboard');
      });
    },
    [navigate, uploadSelectedDrugs],
  );

  const uploadNaturalProductsAndNavigate = useCallback(
    () => {
      uploadSelectedNaturalProducts().then(() => {
        navigate('/dashboard');
      });
    },
    [navigate, uploadSelectedNaturalProducts],
  );

  const uploadProteinAndNavigate = useCallback(() => {
    uploadSelectedProtein().then(() => {
      navigate('/dashboard')
    })
  }, [navigate, uploadSelectedProtein])

  const onTargetSelectionChange = useCallback((selection) => {
    if (selection.length > 1) {
      const selectionSet = new Set(state.targetSelection);
      const result = selection.filter((s) => !selectionSet.has(s));
      const selectedRowData = targets.find((row) => row.name.toLowerCase() === selection[selection.length - 1].toLowerCase());
      dispatch({type: 'setTargetSelection', payload: result});
      dispatch({type: 'setSelectedTarget', payload: selectedRowData});
    }
  }, [state.targetSelection, dispatch, targets]);

  useEffect(() => {
    if (data && data.results && data.results.length) {
      const defaultDrug = searchText.toLowerCase();
      const defaultDrugRow = drugs.find((row) => row.name.toLowerCase() === defaultDrug);
      if (defaultDrugRow) {
        setTimeout(() => {
          dispatch({type: 'setSelectedDrug', payload: defaultDrugRow});
          dispatch({type: 'setDrugSelection', payload: [defaultDrugRow.name.toLowerCase()]});
        }, 100);
      } else {
        dispatch({type: 'setDrugSelection', payload: [defaultDrug]});
      }
      dispatch({type: 'setDrugs', payload: drugs});
      dispatch({type: 'setNaturalProducts', payload: naturalProducts});
      if (!targets || targets.length === 0) {
        return;
      }
      if (targets && targets.length === 0) {
        dispatch({type: 'setTargets', payload: targets});
        dispatch({type: 'setTargetSelection', payload: []});
        dispatch({type: 'setSelectedTarget', payload: null});
        return;
      }
      const defaultTarget = targets[0].name.toLowerCase();
      const defaultTargetRow = targets.find((row) => row.name.toLowerCase() === defaultTarget);
      if (defaultTargetRow) {
        dispatch({type: 'setSelectedTarget', payload: defaultTargetRow});
      }
      dispatch({type: 'setTargetSelection', payload: [defaultTarget]});
      dispatch({type: 'setTargets', payload: targets});
    }
    if (data && data.results && data.results.length === 0) {
      dispatch({type: 'clean'})
    }
  }, [data, dispatch, drugs, searchText, targets]);

  return (
    <div className="searchDefault">
      <Box>
        <SearchInput value={searchText} onChange={e => setSearchText(e.target.value)} onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setSearchText(e.target.value);
            onRun(e.target.value);
          }
        }} onClick={onRun} onClickGraid={() => navigate('/globalresponse')}/>
        {sortedSuggestions.length > 0 &&
          <>
            <SectionTitle text="Suggestions for better results:" />
            <Stack direction="row" spacing={2}>
              {sortedSuggestions.map(s => <Chip key={s.lbl} label={s.lbl} color="primary" style={{color: 'white'}} onClick={() => {
                setSearchText(s.lbl);
                onRun(s.lbl);
              }} />)}
            </Stack>
          </>
        }
      </Box>
      <Box>{
        state.drugs.length > 0 && <>
          <SectionTitle text="Related Remedies" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DrugResults drugs={state.drugs}
                           onRowClick={(param) => {
                             drugHandleClick(param.row);
                             setClickedRow(param.row.name.toLowerCase());
                           }}
                           selectionModel={state.drugSelection}
                           onSelectionModelChange={(ids) => {
                             dispatch({type: 'setDrugSelection', payload: ids});
                           }}
                           rowClassName={(params) => params.id === clickedRow ? 'selected-bg' : ''}
                           onClick={uploadDrugsAndNavigate} />
              <NaturalProductsResults naturalProducts={state.naturalProducts}
                                      onRowClick={(param) => {
                                        drugHandleClick(param.row);
                                        setClickedRow(param.row.name.toLowerCase());
                                      }}
                                      selectionModel={state.naturalProductSelection}
                                      onSelectionModelChange={(ids) => {
                                        dispatch({type: 'setNaturalProductSelection', payload: ids});
                                      }}
                                      rowClassName={(params) => params.id === clickedRow ? 'selected-bg' : ''}
                                      onClick={uploadNaturalProductsAndNavigate} />
            </Grid>
            <Grid item xs={6}>
              <DrugLiterature drug={state.selectedDrug} />
            </Grid>
          </Grid>
        </>
      }
      {state.targets.length > 0 && <>
        <SectionTitle text="Related Target Proteins" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ProteinResults targets={state.targets}
                            selectionModel={state.targetSelection}
                            onSelectionModelChange={onTargetSelectionChange}
                            onUpdateProteinAndDrug={uploadSelectedProteinDrugs}
                            onClick={uploadProteinAndNavigate} />
          </Grid>
          <Grid item xs={6}>
            <TargetLiterature target={state.selectedTarget} />
          </Grid>
        </Grid>
        <DrugSynthesis searchText={state.selectedDrug ? state.selectedDrug.title : searchText} />
      </>
      }
      {isNotFound && (
        <Stack spacing={4} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', boxShadow: '0px 4px 13px 0px rgba(133, 153, 170, 0.5)', flexDirection: 'column', padding: 5, borderRadius: 2}}>
          <Typography variant='subtitle1' color="gray">{`No results found for “${notFoundValue}”.`}</Typography>
          <Typography variant='subtitle1' color="gray">Please try another search.</Typography>
          <Typography variant='subtitle1' color="gray">Examples: Covid-19, marburg, monkeypox</Typography>
        </Stack>
      )}
      </Box>
      {loading && <CircularProgressComponent />}
      {secondaryLoader && <CircularProgressComponent />}
      <DrugProperties />
    </div>
  );
};
