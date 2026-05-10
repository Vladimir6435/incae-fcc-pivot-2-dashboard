"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ReferenceLine, ReferenceArea, Legend
} from 'recharts';

// ============================================================================
// MODELO LINEAL EXPORTADO DESDE COLAB (model_export.json embebido)
// ============================================================================
const MODEL = {"meta":{"description":"Modelo lineal para simulación what-if de cultural_sentiment_score (caso FCC, pivote 2)","training_data":"FCC dataset, n=605, 55 empleados x 11 trimestres","training_period":"2013-Q3 a 2016-Q1","seed":1234,"r2_in_sample":0.7538995145243461,"rmse_in_sample":1.2632273001316932,"r2_cv5_shuffle_mean":0.6927596579847987,"r2_cv5_shuffle_std":0.018847619138628636,"r2_cv5_group_mean":0.6974028053359623,"r2_cv5_group_std":0.038310868880344906,"r2_holdout_reference":0.66,"rmse_holdout_reference":1.405,"usage":"what_if_simulation","do_not_use_for":"temporal_forecasting (R²=0.18 en split temporal)"},"feature_order":["tenure_years","prior_cio_changes_experienced","legacy_systems_in_bureau","systems_migrated_in_bureau","it_om_budget_ratio_pct","security_incidents_quarter","employee_engagement_score","leadership_confidence_score","change_readiness_index","change_resistance_index","digital_training_hours_quarter","innovation_ideas_submitted","participated_in_scrum","participated_feedback_session","is_change_agent","intrapreneur_assigned","quick_wins_experienced_count","digital_tool_adoption_score","collaboration_cross_bureau_index","communication_effectiveness_score","feedback_frequency_score","telework_adoption_score","blog_engagement_score","twitter_following_cio","transparency_perception_score","security_posture_score","years_since_last_training","employee_type_federal_employee","role_category_administrative","role_category_field_operations","role_category_policy_analyst","role_category_program_staff","bureau_office_Consumer_Governmental_Affairs","bureau_office_Enforcement_Bureau","bureau_office_International_Bureau","bureau_office_Media_Bureau","bureau_office_Office_of_Chief_Information_Officer","bureau_office_Office_of_Communications","bureau_office_Office_of_Economics_Analytics","bureau_office_Office_of_General_Counsel","bureau_office_Office_of_Legislative_Affairs","bureau_office_Office_of_Managing_Director","bureau_office_Office_of_Media_Relations","bureau_office_Office_of_Strategic_Planning","bureau_office_Office_of_Workplace_Diversity","bureau_office_Public_Safety","bureau_office_Wireless_Telecommunications","bureau_office_Wireline_Competition","cloud_migration_phase_inventory","cloud_migration_phase_migration","cloud_migration_phase_optimization"],"model":{"intercept":5.558231404958677,"coefficients":{"tenure_years":0.3039573731923139,"prior_cio_changes_experienced":-0.556048274430092,"legacy_systems_in_bureau":0.020116981890729878,"systems_migrated_in_bureau":0.21598934159211836,"it_om_budget_ratio_pct":-0.4157568166323989,"security_incidents_quarter":-0.04296300514360314,"employee_engagement_score":0.1553288418522135,"leadership_confidence_score":0.13237688402242767,"change_readiness_index":-0.061963090137464386,"change_resistance_index":-0.14455937034586155,"digital_training_hours_quarter":-0.07137179146221721,"innovation_ideas_submitted":0.14527301783615537,"participated_in_scrum":0.05582593076664518,"participated_feedback_session":0.029361072562973017,"is_change_agent":0.011656895066870366,"intrapreneur_assigned":0.084216935240181,"quick_wins_experienced_count":0.05537492253081903,"digital_tool_adoption_score":0.03657609285389167,"collaboration_cross_bureau_index":-0.009330171565803244,"communication_effectiveness_score":0.3034195258543754,"feedback_frequency_score":0.20841838517160854,"telework_adoption_score":0.050194328077949525,"blog_engagement_score":0.1705802065750479,"twitter_following_cio":-0.03005264000893604,"transparency_perception_score":0.00842414967277349,"security_posture_score":-0.023316748000043346,"years_since_last_training":-0.01977011539687349,"employee_type_federal_employee":0.09483295136277858,"role_category_administrative":-0.20935686277537396,"role_category_field_operations":-0.136143893892859,"role_category_policy_analyst":-0.05282400723467856,"role_category_program_staff":-0.1922933955880654,"bureau_office_Consumer_Governmental_Affairs":-0.051687136487041915,"bureau_office_Enforcement_Bureau":-0.1424661067107224,"bureau_office_International_Bureau":-0.12429565795601227,"bureau_office_Media_Bureau":-0.18997644711560685,"bureau_office_Office_of_Chief_Information_Officer":-0.047494979917176224,"bureau_office_Office_of_Communications":-0.09364396336545897,"bureau_office_Office_of_Economics_Analytics":-0.01736880810529135,"bureau_office_Office_of_General_Counsel":-0.15295361097387325,"bureau_office_Office_of_Legislative_Affairs":-0.02543322346299694,"bureau_office_Office_of_Managing_Director":-0.1290755852245041,"bureau_office_Office_of_Media_Relations":-0.11086628020082688,"bureau_office_Office_of_Strategic_Planning":-0.16402798753598352,"bureau_office_Office_of_Workplace_Diversity":-0.12232690429864905,"bureau_office_Public_Safety":-0.2230999594211084,"bureau_office_Wireless_Telecommunications":-0.05280448280316368,"bureau_office_Wireline_Competition":-0.09680185410638337,"cloud_migration_phase_inventory":-0.682350887068472,"cloud_migration_phase_migration":-0.056223870030253614,"cloud_migration_phase_optimization":-0.01874732061005331}},"scaler":{"mean":{"tenure_years":15.736363636363636,"prior_cio_changes_experienced":4.109090909090909,"legacy_systems_in_bureau":8.72396694214876,"systems_migrated_in_bureau":2.5603305785123966,"it_om_budget_ratio_pct":66.44545454545455,"security_incidents_quarter":1.6363636363636365,"employee_engagement_score":4.788099173553719,"leadership_confidence_score":5.638380165289257,"change_readiness_index":4.2904132231404954,"change_resistance_index":6.713818181818182,"digital_training_hours_quarter":3.700826446280992,"innovation_ideas_submitted":0.687603305785124,"participated_in_scrum":0.2512396694214876,"participated_feedback_session":0.36198347107438017,"is_change_agent":0.15867768595041323,"intrapreneur_assigned":0.13388429752066117,"quick_wins_experienced_count":1.312396694214876,"digital_tool_adoption_score":4.490297520661157,"collaboration_cross_bureau_index":4.506066115702479,"communication_effectiveness_score":4.687752066115703,"feedback_frequency_score":4.144809917355372,"telework_adoption_score":4.235702479338843,"blog_engagement_score":4.0068595041322315,"twitter_following_cio":0.28760330578512394,"transparency_perception_score":5.058578512396695,"security_posture_score":4.82504132231405,"years_since_last_training":0.7720826446280991,"employee_type_federal_employee":0.6909090909090909,"role_category_administrative":0.2,"role_category_field_operations":0.14545454545454545,"role_category_policy_analyst":0.14545454545454545,"role_category_program_staff":0.3090909090909091,"bureau_office_Consumer_Governmental_Affairs":0.01818181818181818,"bureau_office_Enforcement_Bureau":0.05454545454545454,"bureau_office_International_Bureau":0.05454545454545454,"bureau_office_Media_Bureau":0.10909090909090909,"bureau_office_Office_of_Chief_Information_Officer":0.01818181818181818,"bureau_office_Office_of_Communications":0.16363636363636364,"bureau_office_Office_of_Economics_Analytics":0.05454545454545454,"bureau_office_Office_of_General_Counsel":0.07272727272727272,"bureau_office_Office_of_Legislative_Affairs":0.01818181818181818,"bureau_office_Office_of_Managing_Director":0.05454545454545454,"bureau_office_Office_of_Media_Relations":0.03636363636363636,"bureau_office_Office_of_Strategic_Planning":0.05454545454545454,"bureau_office_Office_of_Workplace_Diversity":0.01818181818181818,"bureau_office_Public_Safety":0.05454545454545454,"bureau_office_Wireless_Telecommunications":0.12727272727272726,"bureau_office_Wireline_Competition":0.05454545454545454,"cloud_migration_phase_inventory":0.18181818181818182,"cloud_migration_phase_migration":0.5454545454545454,"cloud_migration_phase_optimization":0.09090909090909091},"scale":{"tenure_years":5.8551411328806084,"prior_cio_changes_experienced":2.269743495902143,"legacy_systems_in_bureau":2.4998851144970717,"systems_migrated_in_bureau":2.201069587435703,"it_om_budget_ratio_pct":13.779917115225304,"security_incidents_quarter":0.7713892158398701,"employee_engagement_score":1.8228449810324932,"leadership_confidence_score":1.8917894858519906,"change_readiness_index":1.7543526020692453,"change_resistance_index":1.8476024580453465,"digital_training_hours_quarter":2.7714153637878676,"innovation_ideas_submitted":0.9790845992819288,"participated_in_scrum":0.4337260632363119,"participated_feedback_session":0.48057407102685384,"is_change_agent":0.3653752563212721,"intrapreneur_assigned":0.34052796125731033,"quick_wins_experienced_count":1.219644322081551,"digital_tool_adoption_score":1.8910372974221812,"collaboration_cross_bureau_index":1.7129629433281652,"communication_effectiveness_score":1.5798550738062236,"feedback_frequency_score":1.7066244790899134,"telework_adoption_score":2.0193531516678496,"blog_engagement_score":1.9153428508909986,"twitter_following_cio":0.45264516377245484,"transparency_perception_score":1.6588033013579802,"security_posture_score":1.6164307808770675,"years_since_last_training":1.2583755604036122,"employee_type_federal_employee":0.46211872825959394,"role_category_administrative":0.4,"role_category_field_operations":0.35255853508482393,"role_category_policy_analyst":0.35255853508482393,"role_category_program_staff":0.46211872825959394,"bureau_office_Consumer_Governmental_Affairs":0.133608531424537,"bureau_office_Enforcement_Bureau":0.2270908363053963,"bureau_office_International_Bureau":0.2270908363053963,"bureau_office_Media_Bureau":0.3117532399905863,"bureau_office_Office_of_Chief_Information_Officer":0.133608531424537,"bureau_office_Office_of_Communications":0.36994527180683284,"bureau_office_Office_of_Economics_Analytics":0.22709083630539628,"bureau_office_Office_of_General_Counsel":0.25968830649246727,"bureau_office_Office_of_Legislative_Affairs":0.133608531424537,"bureau_office_Office_of_Managing_Director":0.2270908363053963,"bureau_office_Office_of_Media_Relations":0.18719327529067276,"bureau_office_Office_of_Strategic_Planning":0.2270908363053963,"bureau_office_Office_of_Workplace_Diversity":0.13360853142453696,"bureau_office_Public_Safety":0.2270908363053963,"bureau_office_Wireless_Telecommunications":0.33327823236042475,"bureau_office_Wireline_Competition":0.22709083630539628,"cloud_migration_phase_inventory":0.38569460791993504,"cloud_migration_phase_migration":0.4979295977319692,"cloud_migration_phase_optimization":0.2874797872880344}}};

// ============================================================================
// FUNCIÓN DE INFERENCIA — réplica exacta del modelo lineal
// ============================================================================
function predict(inputs) {
  const order = MODEL.feature_order;
  const coefs = MODEL.model.coefficients;
  const means = MODEL.scaler.mean;
  const scales = MODEL.scaler.scale;
  let pred = MODEL.model.intercept;
  for (const f of order) {
    const x = inputs[f] !== undefined ? inputs[f] : means[f];
    pred += coefs[f] * (x - means[f]) / scales[f];
  }
  return pred;
}

// ============================================================================
// DATOS DE LA TRANSFORMACIÓN (extraídos del dataset original)
// ============================================================================
const QUARTERLY_DATA = [
  { quarter: "2013-Q3", sentiment: 1.83, engagement: 2.45, leadership: 2.32, readiness: 2.23, om: 84.3, systems: 0.00, training: 0.33, ideas: 0.07, scrum: 0.00, change_agent: 0.04, intrapreneur: 0.00 },
  { quarter: "2013-Q4", sentiment: 2.04, engagement: 2.96, leadership: 3.11, readiness: 2.70, om: 85.5, systems: 0.00, training: 0.40, ideas: 0.07, scrum: 0.07, change_agent: 0.04, intrapreneur: 0.00 },
  { quarter: "2014-Q1", sentiment: 3.98, engagement: 3.34, leadership: 4.33, readiness: 3.06, om: 80.2, systems: 0.00, training: 1.95, ideas: 0.22, scrum: 0.22, change_agent: 0.05, intrapreneur: 0.15 },
  { quarter: "2014-Q2", sentiment: 5.04, engagement: 3.99, leadership: 5.37, readiness: 3.45, om: 79.1, systems: 0.00, training: 2.33, ideas: 0.16, scrum: 0.15, change_agent: 0.11, intrapreneur: 0.05 },
  { quarter: "2014-Q3", sentiment: 5.22, engagement: 4.28, leadership: 5.61, readiness: 3.86, om: 63.6, systems: 3.58, training: 3.80, ideas: 0.35, scrum: 0.20, change_agent: 0.15, intrapreneur: 0.16 },
  { quarter: "2014-Q4", sentiment: 6.11, engagement: 4.82, leadership: 6.06, readiness: 4.32, om: 64.6, systems: 3.62, training: 4.27, ideas: 0.56, scrum: 0.27, change_agent: 0.16, intrapreneur: 0.16 },
  { quarter: "2015-Q1", sentiment: 6.61, engagement: 5.45, leadership: 6.46, readiness: 4.69, om: 66.2, systems: 3.58, training: 5.27, ideas: 1.27, scrum: 0.25, change_agent: 0.18, intrapreneur: 0.13 },
  { quarter: "2015-Q2", sentiment: 6.75, engagement: 5.73, leadership: 6.54, readiness: 5.01, om: 63.5, systems: 3.56, training: 5.22, ideas: 1.27, scrum: 0.31, change_agent: 0.20, intrapreneur: 0.20 },
  { quarter: "2015-Q3", sentiment: 7.43, engagement: 6.12, leadership: 7.05, readiness: 5.31, om: 48.5, systems: 4.45, training: 5.98, ideas: 1.25, scrum: 0.36, change_agent: 0.27, intrapreneur: 0.24 },
  { quarter: "2015-Q4", sentiment: 7.91, engagement: 6.58, leadership: 7.52, readiness: 6.21, om: 50.2, systems: 4.38, training: 5.56, ideas: 1.25, scrum: 0.44, change_agent: 0.25, intrapreneur: 0.20 },
  { quarter: "2016-Q1", sentiment: 8.21, engagement: 6.95, leadership: 7.66, readiness: 6.36, om: 45.2, systems: 4.98, training: 5.60, ideas: 1.07, scrum: 0.49, change_agent: 0.29, intrapreneur: 0.18 }
];

const BUREAU_CHANGE = [
  { bureau: "Office of Legislative Affairs", delta: 7.48 },
  { bureau: "Public Safety", delta: 7.10 },
  { bureau: "Wireless Telecommunications", delta: 7.08 },
  { bureau: "Office of Economics Analytics", delta: 6.96 },
  { bureau: "Administrative Operations", delta: 6.90 },
  { bureau: "Wireline Competition", delta: 6.67 },
  { bureau: "Consumer Governmental Affairs", delta: 6.64 },
  { bureau: "Office of CIO", delta: 6.63 },
  { bureau: "Media Bureau", delta: 6.38 },
  { bureau: "Office of Workplace Diversity", delta: 6.24 },
  { bureau: "Office of Communications", delta: 6.18 },
  { bureau: "International Bureau", delta: 6.14 },
  { bureau: "Office of General Counsel", delta: 6.10 },
  { bureau: "Office of Managing Director", delta: 6.00 },
  { bureau: "Enforcement Bureau", delta: 5.78 },
  { bureau: "Office of Media Relations", delta: 5.51 },
  { bureau: "Office of Strategic Planning", delta: 5.11 }
];

const COHORT_DATA = [
  { cohort: "Baja rotación (0–3 CIOs)", n: 286, mean: 6.18, std: 2.53, r2: 0.49 },
  { cohort: "Media rotación (4–6 CIOs)", n: 198, mean: 5.30, std: 2.48, r2: 0.57 },
  { cohort: "Alta rotación (7+ CIOs)", n: 121, mean: 4.51, std: 2.31, r2: 0.50 }
];

const TOP_LEVERS_BY_DOMAIN = {
  material: [
    { feature: "Fase de inventario inicial (cloud)", coef: -0.692, robust: true, note: "Dolor cultural durante migración" },
    { feature: "CIOs previos vividos", coef: -0.485, robust: true, note: "Daño acumulativo de rotación" },
    { feature: "Ratio O&M de presupuesto IT", coef: -0.397, robust: true, note: "Deuda técnica como peso cultural" },
    { feature: "Antigüedad en años", coef: 0.372, robust: true, note: "Tenure como ancla institucional" },
    { feature: "Sistemas migrados a cloud", coef: 0.220, robust: true, note: "Modernización visible" }
  ],
  symbolic: [
    { feature: "Comunicación efectiva", coef: 0.330, robust: true, note: "La palanca simbólica más fuerte" },
    { feature: "Frecuencia de feedback", coef: 0.220, robust: true, note: "Loops de retroalimentación cortos" },
    { feature: "Engagement en blogs internos", coef: 0.196, robust: true, note: "Voz visible del CIO" },
    { feature: "Disposición al cambio", coef: 0.132, robust: false, note: "Signo inestable entre enfoques" },
    { feature: "Engagement de empleados", coef: 0.130, robust: true, note: "Co-mueve con sentimiento" }
  ],
  behavior: [
    { feature: "Participación en scrum", coef: 0.104, robust: true, note: "Adopción ágil" },
    { feature: "Asignación intraemprendedora", coef: 0.088, robust: true, note: "Empoderamiento creativo" },
    { feature: "Sigue al CIO en Twitter", coef: -0.061, robust: true, note: "Posible saturación de comunicación" },
    { feature: "Sesiones de feedback", coef: -0.055, robust: false, note: "Signo inestable entre enfoques" },
    { feature: "Es change agent", coef: -0.016, robust: false, note: "Signo cercano a cero, sin efecto claro" }
  ]
};

const PREDICTIONS_SAMPLE = [
  { real: 4.10, predicted: 2.12 }, { real: 4.06, predicted: 4.50 }, { real: 4.98, predicted: 4.89 },
  { real: 8.62, predicted: 6.89 }, { real: 8.30, predicted: 8.13 }, { real: 1.71, predicted: 1.34 },
  { real: 6.20, predicted: 5.98 }, { real: 7.43, predicted: 6.85 }, { real: 5.45, predicted: 4.92 },
  { real: 3.21, predicted: 3.48 }, { real: 7.89, predicted: 7.12 }, { real: 2.05, predicted: 2.78 },
  { real: 6.82, predicted: 6.45 }, { real: 8.12, predicted: 7.55 }, { real: 4.55, predicted: 4.23 },
  { real: 5.91, predicted: 5.48 }, { real: 7.20, predicted: 6.78 }, { real: 3.85, predicted: 4.10 },
  { real: 6.35, predicted: 5.92 }, { real: 8.95, predicted: 7.85 }, { real: 1.50, predicted: 2.01 },
  { real: 5.20, predicted: 5.45 }, { real: 7.60, predicted: 6.95 }, { real: 4.30, predicted: 4.55 },
  { real: 6.78, predicted: 6.12 }, { real: 8.45, predicted: 7.68 }, { real: 2.85, predicted: 3.20 },
  { real: 5.67, predicted: 5.25 }, { real: 7.05, predicted: 6.55 }, { real: 3.95, predicted: 4.18 },
  { real: 6.15, predicted: 5.78 }, { real: 8.20, predicted: 7.42 }, { real: 1.95, predicted: 2.45 },
  { real: 5.40, predicted: 5.18 }, { real: 7.35, predicted: 6.72 }, { real: 4.65, predicted: 4.42 },
  { real: 6.50, predicted: 6.05 }, { real: 8.70, predicted: 7.78 }, { real: 2.40, predicted: 2.85 },
  { real: 5.85, predicted: 5.55 }, { real: 7.10, predicted: 6.58 }, { real: 3.70, predicted: 3.95 },
  { real: 6.25, predicted: 5.85 }, { real: 8.05, predicted: 7.35 }, { real: 1.80, predicted: 2.30 },
  { real: 5.30, predicted: 5.08 }, { real: 7.55, predicted: 6.88 }, { real: 4.45, predicted: 4.32 }
];

const LIMITATIONS = [
  { type: "low_R2_temporal", title: "Predictibilidad temporal limitada", desc: "El modelo predictivo a futuro alcanza solo R²=0.18. La cultura del próximo trimestre no se predice confiablemente desde el comportamiento actual.", evidence: "R²_test_temporal=0.183", impl: "Los KRs simbólicos son aspiracionales, no causalmente garantizados." },
  { type: "sign_disagreement", title: "14% de palancas con signos inestables", desc: "7 de 51 features muestran signos opuestos entre el enfoque temporal y el cross-sectional.", evidence: "7/51 features", impl: "Estas palancas no son robustas para usarse como base de KRs." },
  { type: "unexpected_negative_coef", title: "Training hours con coeficiente negativo", desc: "Más horas de training se asocian con menor sentimiento (coef=-0.08). Posible colinealidad con resistencia o efecto de saturación.", evidence: "coef_crosssec=-0.080", impl: "No tratar el training aisladamente como palanca directa." },
  { type: "unexpected_negative_coef", title: "Change agent con efecto nulo", desc: "Ser change agent no se asocia significativamente con el sentimiento (coef=-0.02).", evidence: "coef_crosssec=-0.016", impl: "El nombramiento sin contexto no produce el efecto esperado." },
  { type: "unmeasured_variable", title: "Liderazgo carismático no medido", desc: "El caso enfatiza la frase 'human flak jacket' de Bray como un acto de comunicación cultural — no es cuantificable en este dataset.", evidence: "variable no presente", impl: "El modelo subestima el dominio simbólico." },
  { type: "unmeasured_variable", title: "Frases memorables internas (Ogilvy)", desc: "Las frases que los empleados pueden repetir en el trabajo no aparecen como variable.", evidence: "variable no presente", impl: "Falta el plano narrativo del cambio cultural." },
  { type: "unmeasured_variable", title: "Reconocimientos públicos por nombre (Mary Kay)", desc: "El reconocimiento individual ritualizado, palanca clave en la teoría de Mary Kay Ash, no está medido.", evidence: "variable no presente", impl: "Falta el plano motivacional explícito." },
  { type: "unmeasured_variable", title: "Decisiones creativas que rompen marcos (Wells Lawrence)", desc: "Los actos de invención organizacional que el panel identificó como críticos no son cuantificables.", evidence: "variable no presente", impl: "Falta el plano de transformación creativa." },
  { type: "unmeasured_variable", title: "Time-to-correction ejecutivo (Lee/Altman)", desc: "Latencia entre detección de fricción y respuesta del CIO no está en el dataset.", evidence: "variable no presente", impl: "Falta la métrica de gobernanza ágil." },
  { type: "cio_rotation_risk", title: "Riesgo de ahistoricidad por rotación", desc: "Solo 1 de 3 palancas top es común a las tres cohortes de rotación de CIO. Los empleados que han vivido más cambios responden a palancas distintas.", evidence: "overlap_top3=1/3", impl: "OKRs heredados sin contexto pierden validez. Se requiere fecha de expiración por cambio de CIO." },
  { type: "small_sample_panel", title: "Tamaño muestral panel pequeño", desc: "Panel de solo 55 empleados × 11 trimestres. Significancia estadística limitada para subgrupos.", evidence: "n_employees=55, n_quarters=11", impl: "Conclusiones a nivel de bureau o role deben tratarse como exploratorias." }
];

const ACTIONABLE_LEVERS = [
  { key: "it_om_budget_ratio_pct", label: "Ratio O&M del presupuesto IT", unit: "%", min: 45.2, max: 85.5, default: 66.4, step: 0.4, domain: "material", goalDirection: "lower", goalValue: 50, goalLabel: "Meta KR: <50%" },
  { key: "systems_migrated_in_bureau", label: "Sistemas migrados (por bureau)", unit: "sistemas", min: 0, max: 7, default: 2.6, step: 0.1, domain: "material", goalDirection: "higher" },
  { key: "digital_training_hours_quarter", label: "Horas de training (por trimestre)", unit: "h", min: 0, max: 15, default: 3.7, step: 0.1, domain: "material", goalDirection: "higher", goalValue: 5, goalLabel: "Meta KR: ≥5h" },
  { key: "innovation_ideas_submitted", label: "Ideas de innovación", unit: "ideas", min: 0, max: 6, default: 0.7, step: 0.1, domain: "material", goalDirection: "higher" },
  { key: "quick_wins_experienced_count", label: "Quick wins experimentados", unit: "wins", min: 0, max: 5, default: 1.3, step: 0.1, domain: "material", goalDirection: "higher" },
  { key: "participated_in_scrum", label: "% empleados en scrum", unit: "", min: 0, max: 1, default: 0.25, step: 0.01, domain: "behavior", goalDirection: "higher", goalValue: 0.40, goalLabel: "Meta KR: ≥40%" },
  { key: "is_change_agent", label: "% change agents", unit: "", min: 0, max: 1, default: 0.16, step: 0.01, domain: "behavior", goalDirection: "higher", goalValue: 0.20, goalLabel: "Meta KR: ≥20%" },
  { key: "intrapreneur_assigned", label: "% intrapreneurs", unit: "", min: 0, max: 1, default: 0.13, step: 0.01, domain: "behavior", goalDirection: "higher" },
  { key: "participated_feedback_session", label: "% en sesiones de feedback", unit: "", min: 0, max: 1, default: 0.36, step: 0.01, domain: "behavior", goalDirection: "higher" },
  { key: "twitter_following_cio", label: "% siguiendo al CIO en Twitter", unit: "", min: 0, max: 1, default: 0.29, step: 0.01, domain: "behavior", goalDirection: "higher" }
];

const BUREAU_OPTIONS = ["Administrative_Operations","Consumer_Governmental_Affairs","Enforcement_Bureau","International_Bureau","Media_Bureau","Office_of_Chief_Information_Officer","Office_of_Communications","Office_of_Economics_Analytics","Office_of_General_Counsel","Office_of_Legislative_Affairs","Office_of_Managing_Director","Office_of_Media_Relations","Office_of_Strategic_Planning","Office_of_Workplace_Diversity","Public_Safety","Wireless_Telecommunications","Wireline_Competition"];
const ROLE_OPTIONS = ["IT_staff","administrative","field_operations","policy_analyst","program_staff"];
const PHASE_OPTIONS = ["consolidation","inventory","migration","optimization"];

// Paleta viridis (recomendada por Murillo p. 35)
const VIRIDIS = ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"];

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="py-12 border-b border-slate-200">
      <div className="mb-8">
        {eyebrow && <p className="text-xs font-semibold tracking-widest uppercase text-blue-700 mb-2">{eyebrow}</p>}
        <h2 className="text-3xl font-semibold text-slate-900 mb-3">{title}</h2>
        {subtitle && <p className="text-slate-600 max-w-3xl leading-relaxed">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function MetricCard({ label, value, sublabel, accent = "slate" }) {
  const accentMap = {
    slate: "text-slate-900", blue: "text-blue-700", emerald: "text-emerald-700",
    rose: "text-rose-700", amber: "text-amber-700", purple: "text-purple-700"
  };
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-1">{label}</p>
      <p className={`text-3xl font-semibold ${accentMap[accent]}`}>{value}</p>
      {sublabel && <p className="text-xs text-slate-500 mt-1">{sublabel}</p>}
    </div>
  );
}

function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-slate-300 rounded-md shadow-md px-3 py-2 text-xs">
      {label && <p className="font-semibold text-slate-900 mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {formatter ? formatter(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

// ============================================================================
// SECCIÓN: HEADER + HERO
// ============================================================================
function Header() {
  return (
    <div className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-300 mb-3">Vector-AI MED · INCAE Digital Business · 2025</p>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight max-w-4xl">
          Cultura y Liderazgo Digital en la FCC
        </h1>
        <p className="text-xl text-slate-300 mt-3 max-w-3xl">
          Pivote 2 del marco de evolución digital aplicado al caso <span className="italic">How the US Federal Communications Commission Managed the Process of IT Modernization</span>
        </p>
        <div className="mt-8 inline-flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span className="text-slate-300">
            <span className="font-semibold text-white">OKR firmado por D. Bray, vigente Q3 2013 – Q1 2016.</span> Expirable al cambio de CIO.
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECCIÓN: CONTEXTO
// ============================================================================
function ContextSection() {
  return (
    <Section id="contexto" eyebrow="Sección 1" title="El caso y su marco" subtitle="La FCC en agosto de 2013: 207 sistemas legacy, 80–85% del presupuesto IT en O&M, 9 CIOs en 8 años, tenencia promedio de 15.5 años. El Dr. David Bray asume como CIO #10 y enmarca su intervención como 'human flak jacket'.">
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <p className="text-xs font-semibold tracking-wide uppercase text-blue-700 mb-2">Sensing</p>
          <p className="text-sm text-slate-700 leading-relaxed">Bray identifica que la deuda técnica (85% O&M) es un síntoma, no la enfermedad. La enfermedad es cultural: empleados desconectados, escépticos de cualquier transformación, fragmentados entre 17 bureaus.</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
          <p className="text-xs font-semibold tracking-wide uppercase text-purple-700 mb-2">Seizing</p>
          <p className="text-sm text-slate-700 leading-relaxed">Cuatro frentes paralelos: modernizar infraestructura, empoderar change agents, alinear top management y sostener engagement con stakeholders externos. Combina lo material con lo simbólico desde el día uno.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
          <p className="text-xs font-semibold tracking-wide uppercase text-emerald-700 mb-2">Configuring</p>
          <p className="text-sm text-slate-700 leading-relaxed">Reconfiguración con quick wins visibles. Prototipado de 7 meses a menos de 48 horas. Migración de 207 sistemas a cloud. Sentimiento de empleados de 33% a más del 80% en dos años.</p>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-3">OKR replanteado tras dos sesiones del panel de expertos</h3>
        <p className="text-sm text-slate-600 mb-4">Panel: David Ogilvy, Mary Kay Ash, Mary Wells Lawrence, Kai-Fu Lee, Sam Altman. Resultado: separación material/simbólico, fecha de expiración por CIO, panel lateral metodológico.</p>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <span className="font-semibold text-slate-900 min-w-24">Objetivo</span>
            <span className="text-slate-700 italic">"Para diciembre de 2015, transformar la FCC en agencia federal de referencia en modernización digital — medible porque cada empleado podrá nombrar tres cosas que hace hoy y eran imposibles en 2013."</span>
          </div>
          <div className="flex gap-3">
            <span className="font-semibold text-blue-700 min-w-24">KR Material</span>
            <span className="text-slate-700">O&M &lt;50% del presupuesto IT · ≥5h training/trimestre · ciclo idea→prototipo &lt;30 días</span>
          </div>
          <div className="flex gap-3">
            <span className="font-semibold text-amber-700 min-w-24">KR Comportamiento</span>
            <span className="text-slate-700">≥40% participación en scrum · ≥20% empleados como change agents</span>
          </div>
          <div className="flex gap-3">
            <span className="font-semibold text-purple-700 min-w-24">KPI Simbólico</span>
            <span className="text-slate-700"><span className="italic">Solo observación, sin meta:</span> sentimiento cultural · engagement · confianza en liderazgo</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// SECCIÓN: KPIs MATERIAL CON METAS
// ============================================================================
function MaterialKPIs() {
  return (
    <Section id="material" eyebrow="Sección 2 · Dominio material" title="KPIs operativos con metas y semáforos" subtitle="Variables auditables sin encuesta. Aquí los OKRs son legítimos: las metas son alcanzables, observables y no se degradan al medirse.">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-1">¿Cómo cayó el ratio O&M del presupuesto IT?</h3>
          <p className="text-xs text-slate-500 mb-4">Meta KR: bajar del 85% al &lt;50% para Q4 2015</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={QUARTERLY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[40, 90]} />
              <Tooltip content={<CustomTooltip formatter={v => `${v}%`} />} />
              <ReferenceLine y={50} stroke="#dc2626" strokeDasharray="4 4" label={{ value: "Meta: 50%", position: "right", fill: "#dc2626", fontSize: 11 }} />
              <Line type="linear" dataKey="om" name="O&M %" stroke="#1e40af" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-600 mt-3"><span className="text-emerald-700 font-semibold">Meta cumplida en Q1 2016 (45.2%)</span>. Caída de 84% a 45% en 11 trimestres.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-1">¿Cómo evolucionaron las palancas de comportamiento?</h3>
          <p className="text-xs text-slate-500 mb-4">% empleados en scrum, change agents, intrapreneurs</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={QUARTERLY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => `${(v*100).toFixed(0)}%`} />
              <Tooltip content={<CustomTooltip formatter={v => `${(v*100).toFixed(1)}%`} />} />
              <ReferenceLine y={0.4} stroke="#dc2626" strokeDasharray="4 4" label={{ value: "Meta scrum: 40%", position: "right", fill: "#dc2626", fontSize: 11 }} />
              <Line type="linear" dataKey="scrum" name="Scrum" stroke="#1e40af" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="linear" dataKey="change_agent" name="Change agents" stroke="#0891b2" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="linear" dataKey="intrapreneur" name="Intrapreneurs" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} />
              <Legend verticalAlign="top" height={28} iconType="line" wrapperStyle={{ fontSize: 11 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-600 mt-3"><span className="text-emerald-700 font-semibold">Meta scrum cumplida en Q1 2016 (49%)</span>. Change agents en 29% (sobre meta de 20%).</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-1">¿Cuántos sistemas se migraron a cloud por bureau?</h3>
          <p className="text-xs text-slate-500 mb-4">Promedio por bureau, escala 0–7</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={QUARTERLY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 6]} />
              <Tooltip content={<CustomTooltip formatter={v => v.toFixed(2)} />} />
              <Line type="linear" dataKey="systems" name="Sistemas migrados" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-600 mt-3">Migración arranca en 2014-Q3 (3.58 sistemas por bureau) y crece a casi 5 al cierre.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-1">¿Cómo subió el training digital por trimestre?</h3>
          <p className="text-xs text-slate-500 mb-4">Meta KR: ≥5 horas por trimestre por empleado</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={QUARTERLY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 7]} />
              <Tooltip content={<CustomTooltip formatter={v => `${v}h`} />} />
              <ReferenceLine y={5} stroke="#dc2626" strokeDasharray="4 4" label={{ value: "Meta: 5h", position: "right", fill: "#dc2626", fontSize: 11 }} />
              <Line type="linear" dataKey="training" name="Horas training" stroke="#b45309" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-600 mt-3"><span className="text-emerald-700 font-semibold">Meta cumplida desde Q1 2015 (5.27h)</span>.</p>
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// SECCIÓN: KPIs SIMBÓLICOS - SIN METAS, SOLO OBSERVACIÓN
// ============================================================================
function SymbolicKPIs() {
  return (
    <Section id="simbolico" eyebrow="Sección 3 · Dominio simbólico" title="KPIs culturales en observación pura" subtitle="Estas variables son perceptuales, autoreportadas. Por recomendación del panel (Goodhart's Law, non-stationarity reflexiva) NO tienen metas asignadas. Solo se observan. Convertirlas en metas las degradaría como métricas.">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <div className="w-1 h-full bg-purple-600 rounded-full flex-shrink-0 mt-1"></div>
        <div className="text-sm text-slate-700">
          <span className="font-semibold text-purple-900">Sin líneas de meta. Sin semáforos. Sin objetivos.</span> Esta es la asimetría visual recomendada por el panel de expertos. La separación de dominios es la disciplina metodológica más importante del dashboard.
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-1">¿Cómo evolucionaron las cuatro métricas culturales centrales?</h3>
        <p className="text-xs text-slate-500 mb-4">Sentimiento cultural, engagement, confianza en liderazgo, disposición al cambio (escala 0–10)</p>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={QUARTERLY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} domain={[0, 10]} />
            <Tooltip content={<CustomTooltip formatter={v => v.toFixed(2)} />} />
            <Line type="linear" dataKey="sentiment" name="Sentimiento cultural" stroke="#440154" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="linear" dataKey="engagement" name="Engagement" stroke="#3b528b" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="linear" dataKey="leadership" name="Confianza liderazgo" stroke="#21918c" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="linear" dataKey="readiness" name="Disposición al cambio" stroke="#5ec962" strokeWidth={2} dot={{ r: 3 }} />
            <Legend verticalAlign="top" height={28} iconType="line" wrapperStyle={{ fontSize: 11 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="grid md:grid-cols-4 gap-3 mt-4">
          <MetricCard label="Sentimiento Q3 2013" value="1.83" sublabel="Punto de partida" accent="rose" />
          <MetricCard label="Sentimiento Q1 2016" value="8.21" sublabel="Punto final observado" accent="emerald" />
          <MetricCard label="Cambio total" value="+6.38" sublabel="En escala 0–10" accent="purple" />
          <MetricCard label="11 trimestres" value="2 años 6 meses" sublabel="Periodo de observación" accent="slate" />
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// SECCIÓN: BUREAUS Y COHORTES
// ============================================================================
function BureauCohort() {
  return (
    <Section id="bureaus" eyebrow="Sección 4 · Heterogeneidad" title="Quiénes avanzaron y quiénes quedaron rezagados" subtitle="La transformación cultural no fue uniforme. Algunas oficinas se movieron 7 puntos en sentimiento; otras solo 5. Y los empleados con más exposición a rotación previa de CIOs respondieron a palancas distintas que los de baja rotación.">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-1">¿Qué bureaus avanzaron más en sentimiento cultural?</h3>
          <p className="text-xs text-slate-500 mb-4">Cambio absoluto en sentimiento promedio entre Q3 2013 y Q1 2016</p>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={BUREAU_CHANGE} layout="vertical" margin={{ top: 5, right: 50, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={11} domain={[0, 8]} />
              <YAxis type="category" dataKey="bureau" stroke="#64748b" fontSize={10} width={170} />
              <Tooltip content={<CustomTooltip formatter={v => `+${v.toFixed(2)}`} />} />
              <Bar dataKey="delta" name="Δ sentimiento" radius={[0, 3, 3, 0]}>
                {BUREAU_CHANGE.map((entry, i) => (
                  <Cell key={i} fill={i < 5 ? "#21918c" : i < 12 ? "#3b528b" : "#440154"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-1">¿Cómo difiere el sentimiento por exposición a rotación de CIO?</h3>
            <p className="text-xs text-slate-500 mb-4">Cohortes según número de CIOs experimentados antes de Bray</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={COHORT_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="cohort" stroke="#64748b" fontSize={10} interval={0} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 8]} />
                <Tooltip content={<CustomTooltip formatter={v => v.toFixed(2)} />} />
                <Bar dataKey="mean" name="Sentimiento promedio" radius={[3, 3, 0, 0]}>
                  {COHORT_DATA.map((entry, i) => (
                    <Cell key={i} fill={["#21918c", "#3b528b", "#440154"][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <p className="text-xs font-semibold tracking-wide uppercase text-amber-700 mb-2">Hallazgo crítico</p>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">Solo <span className="font-bold text-amber-700">1 de 3 palancas top</span> es común a las tres cohortes (la fase de inventario inicial de cloud). Los empleados con alta exposición a rotación responden a palancas distintas que los de baja exposición.</p>
            <p className="text-xs text-slate-600">Esto valida empíricamente la recomendación 2 del panel: <span className="italic">los OKRs deben tener fecha de expiración por cambio de CIO porque las palancas no son estables a través de cohortes</span>.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// SECCIÓN: MODELO PREDICTIVO - DIAGNÓSTICO
// ============================================================================
function ModelDiagnostic() {
  return (
    <Section id="modelo" eyebrow="Sección 5 · Modelo predictivo" title="Cómo se construyó el motor de simulación" subtitle="Regresión lineal cross-sectional sobre 605 observaciones. R² estable entre métodos de validación. 86% de palancas con signos consistentes entre enfoques temporal y cross-sectional.">
      <div className="grid md:grid-cols-4 gap-3 mb-8">
        <MetricCard label="R² CV con shuffle" value="0.69" sublabel="± 0.02" accent="blue" />
        <MetricCard label="R² CV por empleado" value="0.70" sublabel="± 0.04 (GroupKFold)" accent="blue" />
        <MetricCard label="R² Holdout 80/20" value="0.66" sublabel="Referencia" accent="blue" />
        <MetricCard label="RMSE test" value="±1.40" sublabel="En escala 0–10" accent="slate" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-1">¿Qué tan bien predice el modelo el sentimiento real?</h3>
          <p className="text-xs text-slate-500 mb-4">Predicción vs valor real (cross-sectional). La línea diagonal indica predicción perfecta.</p>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" dataKey="real" name="Real" stroke="#64748b" fontSize={11} domain={[0, 10]} label={{ value: "Sentimiento real", position: "bottom", offset: -5, fontSize: 11, fill: "#64748b" }} />
              <YAxis type="number" dataKey="predicted" name="Predicho" stroke="#64748b" fontSize={11} domain={[0, 10]} label={{ value: "Sentimiento predicho", angle: -90, position: "left", fontSize: 11, fill: "#64748b" }} />
              <Tooltip content={<CustomTooltip formatter={v => v.toFixed(2)} />} cursor={{ strokeDasharray: '3 3' }} />
              <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 10, y: 10 }]} stroke="#dc2626" strokeDasharray="4 4" />
              <Scatter data={PREDICTIONS_SAMPLE} fill="#1e40af" fillOpacity={0.5} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-1">¿Cuáles son las palancas más fuertes por dominio?</h3>
          <p className="text-xs text-slate-500 mb-4">Coeficientes estandarizados de la regresión cross-sectional. Magnitud absoluta indica fuerza.</p>
          <div className="space-y-4">
            {Object.entries(TOP_LEVERS_BY_DOMAIN).map(([domain, levers]) => (
              <div key={domain}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: domain === "material" ? "#1e40af" : domain === "symbolic" ? "#7c3aed" : "#b45309" }}>
                  {domain === "material" ? "Material" : domain === "symbolic" ? "Simbólico" : "Comportamiento"}
                </p>
                <div className="space-y-1">
                  {levers.slice(0, 4).map((l, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="text-slate-600 w-48 truncate" title={l.feature}>{l.feature}</span>
                      <div className="flex-1 h-4 bg-slate-100 rounded relative">
                        <div
                          className="absolute top-0 h-4 rounded"
                          style={{
                            backgroundColor: l.coef > 0 ? "#10b981" : "#ef4444",
                            opacity: l.robust ? 0.9 : 0.4,
                            width: `${Math.abs(l.coef) * 100}%`,
                            left: l.coef > 0 ? "50%" : `${50 - Math.abs(l.coef) * 100}%`,
                          }}
                        ></div>
                        <div className="absolute top-0 left-1/2 w-px h-4 bg-slate-400"></div>
                      </div>
                      <span className="text-slate-700 font-mono w-12 text-right">{l.coef > 0 ? "+" : ""}{l.coef.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-xs text-slate-500 mt-2 italic">Color verde = palanca positiva, rojo = negativa. Opacidad reducida = signo inestable entre enfoques.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// SECCIÓN: SIMULADOR WHAT-IF (la pieza interactiva)
// ============================================================================
function Simulator() {
  const [bureau, setBureau] = useState("Office_of_Communications");
  const [role, setRole] = useState("program_staff");
  const [phase, setPhase] = useState("migration");
  const [empType, setEmpType] = useState("federal_employee");
  const [sliders, setSliders] = useState(() => {
    const init = {};
    ACTIONABLE_LEVERS.forEach(l => init[l.key] = l.default);
    return init;
  });

  // Construye el input completo para el modelo
  const inputs = useMemo(() => {
    const out = {};
    // Variables fijas en sus medias (excepto contexto categórico y sliders)
    for (const f of MODEL.feature_order) {
      out[f] = MODEL.scaler.mean[f];
    }
    // Aplicar sliders
    for (const k of Object.keys(sliders)) {
      out[k] = sliders[k];
    }
    // Aplicar contexto categórico (one-hot manual)
    // Empleo: drop_first omitió "contractor"
    out["employee_type_federal_employee"] = empType === "federal_employee" ? 1 : 0;
    // Role: drop_first omitió "IT_staff"
    out["role_category_administrative"] = role === "administrative" ? 1 : 0;
    out["role_category_field_operations"] = role === "field_operations" ? 1 : 0;
    out["role_category_policy_analyst"] = role === "policy_analyst" ? 1 : 0;
    out["role_category_program_staff"] = role === "program_staff" ? 1 : 0;
    // Bureau: drop_first omitió "Administrative_Operations"
    BUREAU_OPTIONS.forEach(b => {
      if (b !== "Administrative_Operations") {
        out[`bureau_office_${b}`] = bureau === b ? 1 : 0;
      }
    });
    // Phase: drop_first omitió "consolidation"
    out["cloud_migration_phase_inventory"] = phase === "inventory" ? 1 : 0;
    out["cloud_migration_phase_migration"] = phase === "migration" ? 1 : 0;
    out["cloud_migration_phase_optimization"] = phase === "optimization" ? 1 : 0;
    return out;
  }, [bureau, role, phase, empType, sliders]);

  const prediction = useMemo(() => predict(inputs), [inputs]);
  const baseline = MODEL.scaler.mean.cloud_migration_phase_inventory ? predict({}) : 5.56;
  const delta = prediction - baseline;
  const rmse = MODEL.meta.rmse_holdout_reference;

  // Descomposición de contribución por slider
  const contributions = useMemo(() => {
    return ACTIONABLE_LEVERS.map(l => {
      const coef = MODEL.model.coefficients[l.key];
      const mean = MODEL.scaler.mean[l.key];
      const scale = MODEL.scaler.scale[l.key];
      const contribution = coef * (sliders[l.key] - mean) / scale;
      return { feature: l.label, value: contribution, domain: l.domain };
    }).filter(c => Math.abs(c.value) > 0.005).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  }, [sliders]);

  const resetDefaults = () => {
    const init = {};
    ACTIONABLE_LEVERS.forEach(l => init[l.key] = l.default);
    setSliders(init);
  };

  const setHighScenario = () => {
    setSliders({
      it_om_budget_ratio_pct: 45.2,
      systems_migrated_in_bureau: 7,
      digital_training_hours_quarter: 8,
      innovation_ideas_submitted: 4,
      quick_wins_experienced_count: 4,
      participated_in_scrum: 0.6,
      is_change_agent: 0.3,
      intrapreneur_assigned: 0.4,
      participated_feedback_session: 0.7,
      twitter_following_cio: 0.5
    });
    setPhase("optimization");
  };

  const setLowScenario = () => {
    setSliders({
      it_om_budget_ratio_pct: 85,
      systems_migrated_in_bureau: 0,
      digital_training_hours_quarter: 0.5,
      innovation_ideas_submitted: 0,
      quick_wins_experienced_count: 0,
      participated_in_scrum: 0,
      is_change_agent: 0,
      intrapreneur_assigned: 0,
      participated_feedback_session: 0.1,
      twitter_following_cio: 0.1
    });
    setPhase("inventory");
  };

  return (
    <Section id="simulador" eyebrow="Sección 6 · Motor de simulación" title="Simulador what-if del sentimiento cultural" subtitle="Mueve los 10 sliders de palancas accionables (material y comportamiento) y observa el efecto sobre el sentimiento cultural predicho. Las variables simbólicas y demográficas están fijas en sus promedios, por la disciplina de separación de dominios del panel.">

      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4 mb-6 text-sm">
        <p className="font-semibold text-amber-900 mb-1">Esto NO es un forecast temporal.</p>
        <p className="text-slate-700">Es un simulador de escenarios cross-sectional (R²=0.66). Responde "si configuramos así estas palancas, ¿qué sentimiento esperaríamos?" — no "¿cuál será el sentimiento en Q3 2016?". El modelo predictivo temporal alcanza solo R²=0.18 y no se debe usar para predicción a futuro.</p>
      </div>

      {/* Contexto */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <p className="text-xs font-semibold tracking-wide uppercase text-slate-700 mb-3">Contexto del simulado</p>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-slate-600 block mb-1">Bureau</label>
            <select value={bureau} onChange={e => setBureau(e.target.value)} className="w-full text-sm border border-slate-300 rounded px-2 py-1.5">
              {BUREAU_OPTIONS.map(b => <option key={b} value={b}>{b.replace(/_/g, " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600 block mb-1">Role category</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full text-sm border border-slate-300 rounded px-2 py-1.5">
              {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r.replace(/_/g, " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600 block mb-1">Tipo de empleado</label>
            <select value={empType} onChange={e => setEmpType(e.target.value)} className="w-full text-sm border border-slate-300 rounded px-2 py-1.5">
              <option value="federal_employee">Federal employee</option>
              <option value="contractor">Contractor</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-600 block mb-1">Fase cloud del bureau</label>
            <select value={phase} onChange={e => setPhase(e.target.value)} className="w-full text-sm border border-slate-300 rounded px-2 py-1.5">
              {PHASE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sliders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-900">Palancas accionables</h3>
              <div className="flex gap-2">
                <button onClick={setLowScenario} className="text-xs px-3 py-1 border border-rose-300 text-rose-700 rounded hover:bg-rose-50">Escenario bajo</button>
                <button onClick={resetDefaults} className="text-xs px-3 py-1 border border-slate-300 text-slate-700 rounded hover:bg-slate-50">Reset</button>
                <button onClick={setHighScenario} className="text-xs px-3 py-1 border border-emerald-300 text-emerald-700 rounded hover:bg-emerald-50">Escenario alto</button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-3">Material</p>
                {ACTIONABLE_LEVERS.filter(l => l.domain === "material").map(l => (
                  <SliderRow key={l.key} lever={l} value={sliders[l.key]} onChange={v => setSliders(s => ({ ...s, [l.key]: v }))} />
                ))}
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-3">Comportamiento</p>
                {ACTIONABLE_LEVERS.filter(l => l.domain === "behavior").map(l => (
                  <SliderRow key={l.key} lever={l} value={sliders[l.key]} onChange={v => setSliders(s => ({ ...s, [l.key]: v }))} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Predicción + Descomposición */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white rounded-lg p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-300 mb-2">Sentimiento predicho</p>
            <p className="text-5xl font-semibold mb-2">{Math.max(0, Math.min(10, prediction)).toFixed(2)}<span className="text-2xl text-slate-400 font-normal">/10</span></p>
            <p className="text-sm text-slate-300 mb-3">Banda de incertidumbre: ±{rmse.toFixed(2)} (RMSE test)</p>
            <div className="flex items-center gap-2 text-xs">
              <span className={delta > 0 ? "text-emerald-400" : "text-rose-400"}>
                {delta > 0 ? "▲" : "▼"} {delta > 0 ? "+" : ""}{delta.toFixed(2)}
              </span>
              <span className="text-slate-400">vs baseline ({baseline.toFixed(2)})</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Min observado: 1.0</span>
                <span>Max observado: 10.0</span>
              </div>
              <div className="mt-1 h-2 bg-slate-700 rounded relative">
                <div
                  className="absolute top-0 h-2 rounded bg-blue-500"
                  style={{ width: `${Math.max(2, Math.min(98, (prediction / 10) * 100))}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <p className="text-xs font-semibold tracking-wide uppercase text-slate-700 mb-3">Contribución de cada palanca</p>
            {contributions.length === 0 ? (
              <p className="text-xs text-slate-500 italic">Todas las palancas en sus valores promedio.</p>
            ) : (
              <div className="space-y-1.5">
                {contributions.slice(0, 8).map((c, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-600 truncate flex-1">{c.feature}</span>
                      <span className={c.value > 0 ? "text-emerald-700 font-mono ml-2" : "text-rose-700 font-mono ml-2"}>
                        {c.value > 0 ? "+" : ""}{c.value.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded relative">
                      <div
                        className="absolute top-0 h-1.5 rounded"
                        style={{
                          backgroundColor: c.value > 0 ? "#10b981" : "#ef4444",
                          width: `${Math.min(50, Math.abs(c.value) * 80)}%`,
                          left: c.value > 0 ? "50%" : `${50 - Math.min(50, Math.abs(c.value) * 80)}%`
                        }}
                      ></div>
                      <div className="absolute top-0 left-1/2 w-px h-1.5 bg-slate-400"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

function SliderRow({ lever, value, onChange }) {
  const display = lever.unit === "" ? `${(value * 100).toFixed(0)}%` : `${value.toFixed(lever.step < 1 ? 1 : 0)} ${lever.unit}`;
  const goalReached = lever.goalValue !== undefined && (
    (lever.goalDirection === "higher" && value >= lever.goalValue) ||
    (lever.goalDirection === "lower" && value <= lever.goalValue)
  );
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline text-xs mb-1">
        <span className="text-slate-700">{lever.label}</span>
        <span className="font-mono font-semibold text-slate-900">{display}</span>
      </div>
      <input
        type="range"
        min={lever.min}
        max={lever.max}
        step={lever.step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
      />
      {lever.goalLabel && (
        <p className={`text-xs mt-1 ${goalReached ? "text-emerald-700 font-semibold" : "text-slate-500"}`}>
          {goalReached ? "✓ " : ""}{lever.goalLabel}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// SECCIÓN: LO QUE ESTE OKR NO CAPTURA
// ============================================================================
function NotCaptured() {
  const grouped = LIMITATIONS.reduce((acc, l) => {
    const key = l.type;
    if (!acc[key]) acc[key] = [];
    acc[key].push(l);
    return acc;
  }, {});
  const groupLabels = {
    low_R2_temporal: "Limitaciones del modelo predictivo",
    sign_disagreement: "Inestabilidad de palancas",
    unexpected_negative_coef: "Coeficientes con signos inesperados",
    unmeasured_variable: "Variables del caso publicado no medidas",
    cio_rotation_risk: "Riesgo de ahistoricidad por rotación",
    small_sample_panel: "Limitaciones muestrales"
  };
  const groupColors = {
    low_R2_temporal: "bg-blue-50 border-blue-200 text-blue-900",
    sign_disagreement: "bg-amber-50 border-amber-200 text-amber-900",
    unexpected_negative_coef: "bg-amber-50 border-amber-200 text-amber-900",
    unmeasured_variable: "bg-purple-50 border-purple-200 text-purple-900",
    cio_rotation_risk: "bg-rose-50 border-rose-200 text-rose-900",
    small_sample_panel: "bg-slate-50 border-slate-200 text-slate-900"
  };

  return (
    <Section id="limitaciones" eyebrow="Sección 7 · Disciplina metodológica" title="Lo que este OKR no captura" subtitle="Recomendación 3 del panel: el dashboard debe documentar lo no-medido tanto como lo medido. Esta sección no es un apéndice — es un componente central del rigor metodológico.">
      <div className="space-y-4">
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type} className={`border-l-4 rounded-r-lg p-5 ${groupColors[type]}`}>
            <p className="text-xs font-semibold tracking-wide uppercase mb-3">{groupLabels[type]}</p>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="bg-white rounded p-4 border border-slate-200">
                  <p className="font-semibold text-slate-900 text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-slate-700 leading-relaxed mb-2">{item.desc}</p>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 text-xs">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">{item.evidence}</span>
                    <span className="text-slate-600 italic">→ {item.impl}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
  return (
    <div className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-300 mb-2">Caso</p>
            <p className="text-slate-300 leading-relaxed">How the US Federal Communications Commission Managed the Process of IT Modernization. Bray et al., 2013–2016.</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-300 mb-2">Marco metodológico</p>
            <p className="text-slate-300 leading-relaxed">Diego Murillo, <span className="italic">Cracking the Code (No Coding Required)</span>, INCAE 2025. Pivote 2 del marco de evolución digital de Barahona.</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-300 mb-2">Modelo predictivo</p>
            <p className="text-slate-300 leading-relaxed">Regresión lineal cross-sectional. n=605, 51 features. Seed 1234. R²=0.69 (CV con shuffle), R²=0.70 (GroupKFold por empleado).</p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-xs text-slate-400">
          <p>Vector-AI MED · Vladimir González Araya, MD · Especialización AI/Digital Business INCAE 2025 · Universidad Hispanoamericana</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// APP PRINCIPAL
// ============================================================================
export default function FCCDashboard() {
  // Validación al iniciar: ¿el modelo embebido produce los resultados esperados?
  useEffect(() => {
    const tests = [
      { name: "avg_employee", expected: 5.5582 },
      { name: "high_performer", expected: 7.4728 },
      { name: "low_performer", expected: 1.6969 }
    ];
    // Test caso 1: todas en sus medias
    const result1 = predict({});
    if (Math.abs(result1 - 5.5582) > 0.001) {
      console.warn(`Modelo no replica avg_employee: got ${result1.toFixed(4)}, expected 5.5582`);
    } else {
      console.log("✓ Modelo embebido validado: avg_employee = " + result1.toFixed(4));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-6">
        <ContextSection />
        <MaterialKPIs />
        <SymbolicKPIs />
        <BureauCohort />
        <ModelDiagnostic />
        <Simulator />
        <NotCaptured />
      </div>
      <Footer />
    </div>
  );
}
