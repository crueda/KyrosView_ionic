 var EventEnum = {
  0: "EVENTS",
  902: "ALARM",
  903: "PANIC",
  904: "AXA_PANIC",
  905: "THEFT",
  906: "ACCIDENT",
  907: "UNAUTHORIZE",
  908: "COERCION",
  909: "MANUAL",
  910: "LOW_BATTERY",
  911: "MAX_SPEED",
  912: "VEHICLE_STARTED",
  913: "VEHICLE_STOPPED",
  914: "SERVICE_STARTED",
  915: "SERVICE_STOPPED",
  916: "PRIVATE_MODE_ACTIVATED",
  917: "PRIVATE_MODE_DEACTIVATED",
  918: "ALARM_STATE_ACTIVATED",
  919: "ALARM_STATE_DEACTIVATED",
  920: "CLAXON_ACTIVATED",
  921: "CLAXON_DEACTIVATED",
  922: "WARNER_ACTIVATED",
  923: "WARNER_DEACTIVATED",
  924: "POWERSWITCH_ACTIVATED",
  925: "POWERSWITCH_DEACTIVATED",
  926: "SPEAKER_ACTIVATED",
  927: "SPEAKER_DEACTIVATED",
  928: "ALARM_MODE_ACTIVATED",
  929: "ALARM_MODE_DEACTIVATED",
  930: "STOP_TIME_EXCEEDED",
  931: "BRACELET_BREAK_ACTIVATED",
  932: "BRACELET_BREAK_DEACTIVATED",
  933: "BRACELET_HANDLING_ACTIVATED",
  934: "BRACELET_HANDLING_DEACTIVATED",
  935: "DEAD_MAN_ACTIVATED",
  936: "DEAD_MAN_DEACTIVATED",
  937: "AGGRESSOR_APPROACHING_ACTIVATED",
  938: "AGGRESSOR_APPROACHING_DEACTIVATED",
  939: "AGGRESSOR_AWAY_ACTIVATED",
  940: "AGGRESSOR_AWAY_DEACTIVATED",
  941: "PLUG",
  942: "UNPLUG",
  943: "POSITION_TEST",
  944: "RALLYE_MAX_SPEED_EXCEEDED",
  945: "NOT_AUTHORIZED_STOP",
  946: "NOT_AUTHORIZED_STOP_RALLY",
  947: "WORKING_SCHEDULE_KO",
  948: "OBLIGATORY_AREA_ACTIVATED",
  949: "OBLIGATORY_AREA_DEACTIVATED",
  950: "FORBIDDEN_AREA_ACTIVATED",
  951: "FORBIDDEN_AREA_DEACTIVATED",
  952: "GENERIC_AREA_ACTIVATED",
  953: "GENERIC_AREA_DEACTIVATED",
  954: "PROXIMITY_AREA_MAIN_ACTIVATED",
  955: "PROXIMITY_AREA_MAIN_DEACTIVATED",
  956: "DISTANCE_AREA_MAIN_ACTIVATED",
  957: "DISTANCE_AREA_MAIN_DEACTIVATED",
  958: "PROXIMITY_AREA_AFFECTED_ACTIVATED",
  959: "PROXIMITY_AREA_AFFECTED_DEACTIVATED",
  960: "DISTANCE_AREA_AFFECTED_ACTIVATED",
  961: "DISTANCE_AREA_AFFECTED_DEACTIVATED",
  962: "BEACON_IN",
  963: "BEACON_OUT",
  964: "BEACON_JUMPED",
  965: "FRONT_SEAT_ACTIVATED",
  966: "FRONT_SEAT_DEACTIVATED",
  967: "BACK_SEAT_ACTIVATED",
  968: "BACK_SEAT_DEACTIVATED",
  969: "FLAG_DOWN",
  970: "FLAG_UP",
  971: "TAXI_ZONE_ZERO",
  972: "TAXI_ZONE_ONE",
  973: "TAXI_ZONE_TWO",
  974: "TAXI_ZONE_THREE",
  975: "TAXI_DOOR_ACTIVATED",
  976: "TAXI_DOOR_DEACTIVATED",
  977: "FLAG_DOWN_TAXI_ZONE_ZERO",
  978: "FLAG_DOWN_TAXI_ZONE_ONE",
  979: "FLAG_DOWN_TAXI_ZONE_TWO",
  980: "FLAG_DOWN_TAXI_ZONE_THREE",
  981: "START_SPECIAL",
  982: "PAUSE_SPECIAL",
  983: "STOP_SPECIAL",
  984: "PAUSE_VEHICLE",
  985: "RESUME_VEHICLE",
  986: "INIT_LOAD",
  987: "END_LOAD",
  988: "INIT_UNLOAD",
  989: "END_UNLOAD",
  990: "STOP_NEAR_POI",
  991: "CHANGE_DRIVER",
  992: "RECORD_POI",
  993: "DRIVING_HOURS_CONTROL",
  994: "DRIVING_HOURS_CONTROL_DESCANSO_SEMANAL_MENOR_24",
  995: "DRIVING_HOURS_CONTROL_DESCANSO_SEMANAL_REDUCIDO_NO_PERMITIDO",
  996: "DRIVING_HOURS_CONTROL_DESCANSO_SEMANAL_NO_COMPESA_DESCANSO_REDUCIDO",
  997: "DRIVING_HOURS_CONTROL_DESCANSO_DIARIO_REDUCIDO_INCORRECTO",
  998: "DRIVING_HOURS_CONTROL_NO_HAY_DESCANSO_SEMANAL_O_DIARIO_EN_24",
  999: "DRIVING_HOURS_CONTROL_MAS_DE_10_HORAS_EN_EL_DIA",
  1000: "DRIVING_HOURS_CONTROL_EXCESO_CONDUCCION_DIA_2_DIAS_MAS_DE_9_HORAS",
  1001: "INDRIVING_HOURS_CONTROL_EXCESO_CONDUCCION_SEMANA_ACTUAL",
  1002: "DRIVING_HOURS_CONTROL_EXCESO_CONDUCCION_BISEMANAL",
  1003: "DRIVING_HOURS_CONTROL_EXCESO_DE_CONDUCCION_INITERRUMPIDA",
  1004: "DRIVING_HOURS_CONTROL_DESCANSOS_CONDUCCION_INSUFICIENTES",
  1005: "INTERVENTION",
  1006: "GATHERING",
  1008: "INDOOR_PANIC",
  1009: "TRACKING_INDOOR",
  1010: "DBUSCA_PHOTO",
  1011: "TAMPERING",
  1015: "TEMP0",
  1016: "TEMP1",
  1017: "TEMP2",
  1018: "TEMP3",
  1019: "HARSH_ACCELERATION",
  1020: "HARSH_BRAKING",
  1021: "PROXIMITY",
  1022: "OYSTA_PERSONAL_EVENT",
  1023: "OYSTA_CANNED_EVENT",
  1024: "OYSTA_WAYPOINT_EVENT",
  1025: "OYSTA_NFC_EVENT",
  1026: "MAX_TIME_INACTIVITY",
  1027: "BATTERY_CHARGING",
  1028: "AMBER_ALERT",
  1029: "POWER_ON",
  1030: "POWER_OFF",
  1031: "CHECKIN",
  1032: "EHEALTH",
  1033: "EMPTY_BATTERY",
  1034: "RECOVER_BATTERY",
  1035: "HARSH_CORNERING",
  1036: "RPM",
  1037: "TEMP",
  1038: "SENSOR_RANGE",
  1039: "BATTERY_CHARGING_OFF",
  1040: "OVERSPEED_AREA_ACTIVATED",
  1041: "BATTERY_LEVEL",
  1043: "DRIVER_IDENTIFICATION_ON",
  1044: "DRIVER_IDENTIFICATION_OFF",
  1045: "BEACON_NFC_READ",
  1046: "BEACON_NFC_JUMPED",
  1047: "SCAN_EVENT",
  1048: "RESTART",
  1049: "BT_EVENT",
  1050: "STOP_IN_AREA",
  1051: "SIDE_DOOR_OPENING",
  1052: "SIDE_DOOR_CLOSING",
  1053: "BACK_DOOR_OPENING",
  1054: "BACK_DOOR_CLOSING",
  1055: "JAMMER",
  properties: {
    "EVENTS": {icon: "info_info_40.png", description: "Eventos"},
    "ALARM": {icon: "alarm_info_40.png", description: "Alarma"},
    "PANIC": {icon: "panic_info_40.png", description: "Pánico"},
    "AXA_PANIC": {icon: "axa_panic_info_40.png", description: "Pánico"},
    "THEFT": {icon: "theft_info_40.png", description: "Robo"},
    "ACCIDENT": {icon: "accident_info_40.png", description: "Accidente"},
    "UNAUTHORIZE": {icon: "unauthorize_info_40.png", description: "No autorizado"},
    "COERCION": {icon: "coercion_info_40.png", description: "Coerción"},
    "MANUAL": {icon: "manual_info_40.png", description: "Alarma manual"},
    "LOW_BATTERY": {icon: "low_battery_info_40.png", description: "Bateria baja"},
    "MAX_SPEED": {icon: "max_speed_info_40.png", description: "Velocidad máxima excedida"},
    "VEHICLE_STARTED": {icon: "start_info_40.png", description: "Arranque"},
    "VEHICLE_STOPPED": {icon: "stop_info_40.png", description: "Parada"},
    "SERVICE_STARTED": {icon: "service_started_info_40.png", description: "Inicio de servicio"},
    "SERVICE_STOPPED": {icon: "service_stopped_info_40.png", description: "Parada de servicio"},
    "PRIVATE_MODE_ACTIVATED": {icon: "private_mode_activated_info_40.png", description: "Modo privado activado"},
    "PRIVATE_MODE_DEACTIVATED": {icon: "private_mode_deactivated_info_40.png", description: "Modo privado desactivado"},
    "ALARM_STATE_ACTIVATED": {icon: "alarm_state_activated_info_40.png", description: "Estado de alarma activado"},
    "ALARM_STATE_DEACTIVATED": {icon: "alarm_state_deactivated_info_40.png", description: "Estado de alarma desactivado"},
    "CLAXON_ACTIVATED": {icon: "claxon_activated_info_40.png", description: "Claxón activado"},
    "CLAXON_DEACTIVATED": {icon: "claxon_deactivated_info_40.png", description: "Claxón desactivado"},
    "WARNER_ACTIVATED": {icon: "warner_activated_info_40.png", description: "Warning activado"},
    "WARNER_DEACTIVATED": {icon: "warner_deactivated_info_40.png", description: "Warning desactivado"},
    "POWERSWITCH_ACTIVATED": {icon: "powerswitch_activated_info_40.png", description: "Alimentación activada"},
    "POWERSWITCH_DEACTIVATED": {icon: "powerswitch_deactivated_info_40.png", description: "Alimentación desactivada"},
    "SPEAKER_ACTIVATED": {icon: "speaker_activated_info_40.png", description: "Altavoz activado"},
    "SPEAKER_DEACTIVATED": {icon: "speaker_deactivated_info_40.png", description: "Altavoz desactivado"},
    "ALARM_MODE_ACTIVATED": {icon: "alarm_mode_activated_info_40.png", description: "Modo de alarma activado"},
    "ALARM_MODE_DEACTIVATED": {icon: "alarm_mode_deactivated_info_40.png", description: "Modo de alarma desactivado"},
    "STOP_TIME_EXCEEDED": {icon: "stop_time_exceeded_info_40.png", description: "Tiempo de parada excedido"},
    "BRACELET_BREAK_ACTIVATED": {icon: "bracelet_break_activated_info_40.png", description: "Apertura de brazalete activado"},
    "BRACELET_BREAK_DEACTIVATED": {icon: "bracelet_break_deactivated_info_40.png", description: "Apertura de brazalete desactivado"},
    "BRACELET_HANDLING_ACTIVATED": {icon: "bracelet_handling_activated_info_40.png", description: "Brazalete activado"},
    "BRACELET_HANDLING_DEACTIVATED": {icon: "bracelet_handling_deactivated_info_40.png", description: "Brazalete desactivado"},
    "DEAD_MAN_ACTIVATED": {icon: "dead_man_activated_info_40.png", description: "Hombre muerto activado"},
    "DEAD_MAN_DEACTIVATED": {icon: "dead_man_deactivated_info_40.png", description: "Hombre muerto desactivado"},
    "AGGRESSOR_APPROACHING_ACTIVATED": {icon: "aggressor_approaching_activated_info_40.png", description: "Cercanía de agresor activado"},
    "AGGRESSOR_APPROACHING_DEACTIVATED": {icon: "aggressor_approaching_deactivated_info_40.png", description: "Cercanía de agresor desactivado"},
    "AGGRESSOR_AWAY_ACTIVATED": {icon: "aggressor_away_activated_info_40.png", description: "Separación de agresor activado"},
    "AGGRESSOR_AWAY_DEACTIVATED": {icon: "aggressor_away_deactivated_info_40.png", description: "Separación de agresor desactivado"},
    "PLUG": {icon: "plug_info_40.png", description: "Enchufado"},
    "UNPLUG": {icon: "unplug_info_40.png", description: "Desenchufado"},
    "POSITION_TEST": {icon: "position_test_info_40.png", description: "Test de posición"},
    "RALLYE_MAX_SPEED_EXCEEDED": {icon: "rallye_max_speed_exceeded_info_40.png", description: "Velocidad en rally excedida"},
    "NOT_AUTHORIZED_STOP": {icon: "not_authorized_stop_info_40.png", description: "Parada no autorizada"},
    "NOT_AUTHORIZED_STOP_RALLY": {icon: "not_authorized_stop_rally_info_40.png", description: "Parada no autorizada en rally"},
    "WORKING_SCHEDULE_KO": {icon: "working_schedule_ko_info_40.png", description: "Horario de trabajo"},
    "OBLIGATORY_AREA_ACTIVATED": {icon: "obligatory_area_activated_info_40.png", description: "Zona obligatoria activada"},
    "OBLIGATORY_AREA_DEACTIVATED": {icon: "obligatory_area_deactivated_info_40.png", description: "Zona obligatoria desactivada"},
    "FORBIDDEN_AREA_ACTIVATED": {icon: "forbidden_area_activated_info_40.png", description: "Zona prohibida activada"},
    "FORBIDDEN_AREA_DEACTIVATED": {icon: "forbidden_area_deactivated_info_40.png", description: "Zona prohibida desactivada"},
    "GENERIC_AREA_ACTIVATED": {icon: "generic_area_activated_info_40.png", description: "Zona generica activada"},
    "GENERIC_AREA_DEACTIVATED": {icon: "generic_area_deactivated_info_40.png", description: "Zona generica desactivada"},
    "PROXIMITY_AREA_MAIN_ACTIVATED": {icon: "proximity_area_main_activated_info_40.png", description: "Zona de proximidad activada"},
    "PROXIMITY_AREA_MAIN_DEACTIVATED": {icon: "proximity_area_main_deactivated_info_40.png", description: "Zona de proximidad desactivada"},
    "DISTANCE_AREA_MAIN_ACTIVATED": {icon: "distance_area_main_activated_info_40.png", description: "Zona de distancia activada"},
    "DISTANCE_AREA_MAIN_DEACTIVATED": {icon: "distance_area_main_deactivated_info_40.png", description: "Zona de distancia desactivada"},
    "PROXIMITY_AREA_AFFECTED_ACTIVATED": {icon: "proximity_area_affected_activated_info_40.png", description: "Zona de proximidad afectada activada"},
    "PROXIMITY_AREA_AFFECTED_DEACTIVATED": {icon: "proximity_area_affected_deactivated_info_40.png", description: "Zona de proximidad afectada desactivada"},
    "DISTANCE_AREA_AFFECTED_ACTIVATED": {icon: "distance_area_affected_activated_info_40.png", description: "Zona de distancia afectada activada"},
    "DISTANCE_AREA_AFFECTED_DEACTIVATED": {icon: "distance_area_affected_deactivated_info_40.png", description: "Zona de distancia afectada desactivada"},
    "BEACON_IN": {icon: "beacon_in_info_40.png", description: "Entrada en baliza"},
    "BEACON_OUT": {icon: "beacon_out_info_40.png", description: "Salida de baliza"},
    "BEACON_JUMPED": {icon: "beacon_jumped_info_40.png", description: "Salto de baliza"},
    "FRONT_SEAT_ACTIVATED": {icon: "front_seat_activated_info_40.png", description: "Cinturón delantero activado"},
    "FRONT_SEAT_DEACTIVATED": {icon: "front_seat_deactivated_info_40.png", description: "Cinturón delantero desactivado"},
    "BACK_SEAT_ACTIVATED": {icon: "back_seat_activated_info_40.png", description: "Cinturón trasero activado"},
    "BACK_SEAT_DEACTIVATED": {icon: "back_seat_deactivated_info_40.png", description: "Cinturón trasero desactivado"},
    "FLAG_DOWN": {icon: "flag_down_info_40.png", description: "Bajada de bandera"},
    "FLAG_UP": {icon: "flag_up_info_40.png", description: "Subida de bandera"},
    "TAXI_ZONE_ZERO": {icon: "taxi_zone_zero_info_40.png", description: "Taxi zona 0"},
    "TAXI_ZONE_ONE": {icon: "taxi_zone_one_info_40.png", description: "Taxi zona 1"},
    "TAXI_ZONE_TWO": {icon: "taxi_zone_two_info_40.png", description: "Taxi zona 2"},
    "TAXI_ZONE_THREE": {icon: "taxi_zone_three_info_40.png", description: "Taxi zona 3"},
    "TAXI_DOOR_ACTIVATED": {icon: "taxi_door_activated_info_40.png", description: "Puerta de taxi activada"},
    "TAXI_DOOR_DEACTIVATED": {icon: "taxi_door_deactivated_info_40.png", description: "Puerta de taxi desactivada"},
    "FLAG_DOWN_TAXI_ZONE_ZERO": {icon: "flag_down_taxi_zone_zero_info_40.png", description: "Bajada de bandera en zona 0"},
    "FLAG_DOWN_TAXI_ZONE_ONE": {icon: "flag_down_taxi_zone_one_info_40.png", description: "Bajada de bandera en zona 1"},
    "FLAG_DOWN_TAXI_ZONE_TWO": {icon: "flag_down_taxi_zone_two_info_40.png", description: "Bajada de bandera en zona 2"},
    "FLAG_DOWN_TAXI_ZONE_THREE": {icon: "flag_down_taxi_zone_three_info_40.png", description: "Bajada de bandera en zona 3"},
    "START_SPECIAL": {icon: "start_special_info_40.png", description: "Arranque especial"},
    "PAUSE_SPECIAL": {icon: "pause_special_info_40.png", description: "Pausa especial"},
    "STOP_SPECIAL": {icon: "stop_special_info_40.png", description: "Parada especial"},
    "PAUSE_VEHICLE": {icon: "pause_vehicle_info_40.png", description: "Pausa"},
    "RESUME_VEHICLE": {icon: "resume_vehicle_info_40.png", description: "Reanudar"},
    "INIT_LOAD": {icon: "init_load_info_40.png", description: "Inico de carga"},
    "END_LOAD": {icon: "end_load_info_40.png", description: "Fin de carga"},
    "INIT_UNLOAD": {icon: "init_unload_info_40.png", description: "Inicio de descarga"},
    "END_UNLOAD": {icon: "end_unload_info_40.png", description: "Fin de descarga"},
    "STOP_NEAR_POI": {icon: "stop_near_poi_info_40.png", description: "Parada con cercanía a PDI"},
    "CHANGE_DRIVER": {icon: "change_driver_info_40.png", description: "Cambio de conductor"},
    "RECORD_POI": {icon: "record_poi_info_40.png", description: "Guardar PDI"},
    "DRIVING_HOURS_CONTROL": {icon: "driving_hours_control_info_40.png", description: "Control de horas de conducción"},
    "DRIVING_HOURS_CONTROL_DESCANSO_SEMANAL_MENOR_24": {icon: "driving_hours_control_descanso_semanal_menor_24_info_40.png", description: "Descanso semanal menor que 24h."},
    "DRIVING_HOURS_CONTROL_DESCANSO_SEMANAL_REDUCIDO_NO_PERMITIDO": {icon: "driving_hours_control_descanso_semanal_reducido_no_permitido_info_40.png", description: "Descanso reducido no permitido"},
    "DRIVING_HOURS_CONTROL_DESCANSO_SEMANAL_NO_COMPESA_DESCANSO_REDUCIDO": {icon: "driving_hours_control_descanso_semanal_no_compesa_descanso_reducido_info_40.png", description: "Descanso semanal no compensa el reducido"},
    "DRIVING_HOURS_CONTROL_DESCANSO_DIARIO_REDUCIDO_INCORRECTO": {icon: "driving_hours_control_descanso_diario_reducido_incorrecto_info_40.png", description: "Descanso reducido diario incorrecto"},
    "DRIVING_HOURS_CONTROL_NO_HAY_DESCANSO_SEMANAL_O_DIARIO_EN_24": {icon: "driving_hours_control_no_hay_descanso_semanal_o_diario_en_24_info_40.png", description: "Sin descanso semanal o diario en 24h."},
    "DRIVING_HOURS_CONTROL_MAS_DE_10_HORAS_EN_EL_DIA": {icon: "driving_hours_control_mas_de_10_horas_en_el_dia_info_40.png", description: "Conducción de más de 10h. en 1 día"},
    "DRIVING_HOURS_CONTROL_EXCESO_CONDUCCION_DIA_2_DIAS_MAS_DE_9_HORAS": {icon: "driving_hours_control_exceso_conduccion_dia_2_dias_mas_de_9_horas_info_40.png", description: "Conducción con más de 2 días de 9h."},
    "INDRIVING_HOURS_CONTROL_EXCESO_CONDUCCION_SEMANA_ACTUAL": {icon: "indriving_hours_control_exceso_conduccion_semana_actual_info_40.png", description: "Exceso de conducción semanal"},
    "DRIVING_HOURS_CONTROL_EXCESO_CONDUCCION_BISEMANAL": {icon: "driving_hours_control_exceso_conduccion_bisemanal_info_40.png", description: "Exceso de conducción bisemanal"},
    "DRIVING_HOURS_CONTROL_EXCESO_DE_CONDUCCION_INITERRUMPIDA": {icon: "driving_hours_control_exceso_de_conduccion_initerrumpida_info_40.png", description: "Exceso de conducción ininterrupida"},
    "DRIVING_HOURS_CONTROL_DESCANSOS_CONDUCCION_INSUFICIENTES": {icon: "driving_hours_control_descansos_conduccion_insuficientes_info_40.png", description: "Descansos de conducción insuficiente"},
    "INTERVENTION": {icon: "intervention_info_40.png", description: "Intervención"},
    "GATHERING": {icon: "gathering_info_40.png", description: "Agrupación"},
    "INDOOR_PANIC": {icon: "indoor_panic_info_40.png", description: "Pánico indoor"},
    "TRACKING_INDOOR": {icon: "tracking_indoor_info_40.png", description: "Tracking indoor"},
    "DBUSCA_PHOTO": {icon: "dbusca_photo_info_40.png", description: "Foto dbusca"},
    "TAMPERING": {icon: "tampering_info_40.png", description: "Manipulación"},
    "TEMP0": {icon: "temp0_info_40.png", description: "Temperatura"},
    "TEMP1": {icon: "temp1_info_40.png", description: "Temperatura"},
    "TEMP2": {icon: "temp2_info_40.png", description: "Temperatura"},
    "TEMP3": {icon: "temp3_info_40.png", description: "Temperatura"},
    "HARSH_ACCELERATION": {icon: "harsh_acceleration_info_40.png", description: "Aceleración brusca"},
    "HARSH_BRAKING": {icon: "harsh_braking_info_40.png", description: "Frenazo brusco"},
    "PROXIMITY": {icon: "proximity_info_40.png", description: "Proximidad"},
    "OYSTA_PERSONAL_EVENT": {icon: "oysta_personal_event_info_40.png", description: "Evento personal Oysta"},
    "OYSTA_CANNED_EVENT": {icon: "oysta_canned_event_info_40.png", description: "Evento Oysta"},
    "OYSTA_WAYPOINT_EVENT": {icon: "oysta_waypoint_event_info_40.png", description: "Evento de waypoint Oysta"},
    "OYSTA_NFC_EVENT": {icon: "oysta_nfc_event_info_40.png", description: "NFC Oysta"},
    "MAX_TIME_INACTIVITY": {icon: "max_time_inactivity_info_40.png", description: "Inactividad excedida"},
    "BATTERY_CHARGING": {icon: "battery_charging_info_40.png", description: "Carga de bateria"},
    "AMBER_ALERT": {icon: "amber_alert_info_40.png", description: "Alerta ambar"},
    "POWER_ON": {icon: "power_on_info_40.png", description: "Encendido"},
    "POWER_OFF": {icon: "power_off_info_40.png", description: "Apagado"},
    "CHECKIN": {icon: "checkin_info_40.png", description: "Chequeo"},
    "EHEALTH": {icon: "ehealth_info_40.png", description: "e-health"},
    "EMPTY_BATTERY": {icon: "empty_battery_40.png", description: "Bataría agotada"},
    "RECOVER_BATTERY": {icon: "recover_battery_info_40.png", description: "Bateria recuperada"},
    "HARSH_CORNERING": {icon: "harsh_cornering_info_40.png", description: "Curva brusca"},
    "RPM": {icon: "rpm_info_40.png", description: "RPM"},
    "TEMP": {icon: "temp_info_40.png", description: "Temperatura"},
    "SENSOR_RANGE": {icon: "sensor_range_info_40.png", description: "Rango de sensor"},
    "BATTERY_CHARGING_OFF": {icon: "battery_charging_off_info_40.png", description: "Carga de batería apagada"},
    "OVERSPEED_AREA_ACTIVATED": {icon: "speed_16_6Circ.png", description: "Zona de velocidad excesiva activada"},
    "BATTERY_LEVEL": {icon: "battery_level_info_40.png", description: "Nivel de batería"},
    "DRIVER_IDENTIFICATION_ON": {icon: "driver_id_on.png", description: "Identificación del conductor activada"},
    "DRIVER_IDENTIFICATION_OFF": {icon: "driver_id_off.png", description: "Identificación del conductor desactivada"},
    "BEACON_NFC_READ": {icon: "beacon_nfc_read_info_40.png", description: "Lectura de baliza NFC"},
    "BEACON_NFC_JUMPED": {icon: "beacon_nfc_jumped_info_40.png", description: "Salto de baliza NFC"},
    "SCAN_EVENT": {icon: "scan_event_info_40.png", description: "Evento de escaner"},
    "RESTART": {icon: "restart_info_40.png", description: "Reinicio"},
    "BT_EVENT": {icon: "bt_event_info_40.png", description: "Evento BT"},
    "STOP_IN_AREA": {icon: "stop_in_area_info_40.png", description: "Parada en zona"},
    "SIDE_DOOR_OPENING": {icon: "side_door_opening_info_40.png", description: "Apertura de puerta lateral"},
    "SIDE_DOOR_CLOSING": {icon: "side_door_closing_info_40.png", description: "Cierre de puerta lateral"},
    "BACK_DOOR_OPENING": {icon: "back_door_opening_info_40.png", description: "Apertura de puerta trasera"},
    "BACK_DOOR_CLOSING": {icon: "back_door_closing_info_40.png", description: "Cierre de puerta trasera"},
    "JAMMER": {icon: "jammer_info_40.png", description: "Inhibidor GPS"}
  }
};

