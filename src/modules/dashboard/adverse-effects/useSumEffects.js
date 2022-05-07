import { useDashboardContext } from "../context/useDashboarContext";
import { useMemo } from "react";

export const useSumEffects = () => {
  const {state} = useDashboardContext()
  return useMemo(() => {
    if (!state.selectedMolecule) {
      return {
        total: 0,
        adverseEffects: 0,
        contraindications: 0,
      };
    }
    let total = 0;
    let adverseEffects = 0;
    let contraindications = 0;
    if (state.selectedMolecule.structured_adverse_effects && state.selectedMolecule.structured_adverse_effects.length) {
      adverseEffects = state.selectedMolecule.structured_adverse_effects.length;
      total += adverseEffects
    }
    if (state.selectedMolecule.structured_contraindications && state.selectedMolecule.structured_contraindications.length) {
      contraindications = state.selectedMolecule.structured_adverse_effects.length;
      total += contraindications;
    }
    return {
      total,
      adverseEffects: adverseEffects > 100 ? 100 : adverseEffects,
      contraindications: contraindications > 100 ? 100 : contraindications,
    };
  }, [state.selectedMolecule])
}
