// tipos
/*
0: basicas
1: Seguridad
2: geofencing
3: Conduccion
4: Otras
*/

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
  1042: "EVENT_OF_VEHICLE_OR_PERSONAL_DEVICE",
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
  1056: "CHECK_IN_ALREADY_DONE",
  1058: "CHECK_IN",
  1059: "CHECK_OUT",
  1060: "JOB_OPEN",
  1061: "JOB_CLOSED",
  1062: "CHECK_OUT_WITHOUT_CHECK_IN",
  1063: "JOB_PAUSED_BREAKFAST",
  1064: "JOB_RESUMED_BREAKFAST",
  1065: "JOB_PAUSED_LUNCH",
  1066: "JOB_RESUMED_LUNCH",
  1067: "JOB_PAUSED_DINNER",
  1068: "JOB_RESUMED_DINNER",
  1069: "SYSTEM_AREA_ACTIVATED",
  1070: "SYSTEM_AREA_DEACTIVATED",

  properties: {
    "EVENTS": {icon: "info.svg", description: "Eventos", category: "4"},
    "ALARM": {icon: "warning.svg", description: "Alarma", category: "1"},
    "PANIC": {icon: "siren.svg", description: "Pánico", category: "1"},
    "AXA_PANIC": {icon: "siren.svg", description: "Pánico", category: "1"},
    "THEFT": {icon: "siren.svg", description: "Robo", category: "1"},
    "ACCIDENT": {icon: "accident.svg", description: "Accidente", category: "4"},
    "UNAUTHORIZE": {icon: "prohibition.svg", description: "No autorizado", category: "1"},
    "COERCION": {icon: "knife.svg", description: "Coerción", category: "4"},
    "MANUAL": {icon: "hand.svg", description: "Alarma manual", category: "4"},
    "LOW_BATTERY": {icon: "low_battery.svg", description: "Bateria baja", category: "1"},
    "MAX_SPEED": {icon: "max_speed.svg", description: "Velocidad máxima excedida", category: "3"},
    "VEHICLE_STARTED": {icon: "start.svg", description: "Arranque", category: "0"},
    "VEHICLE_STOPPED": {icon: "stop.svg", description: "Parada", category: "0"},
    "SERVICE_STARTED": {icon: "start.svg", description: "Inicio de servicio", category: "0"},
    "SERVICE_STOPPED": {icon: "stop.svg", description: "Parada de servicio", category: "0"},
    "PRIVATE_MODE_ACTIVATED": {icon: "shield_on.svg", description: "Modo privado activado", category: "4"},
    "PRIVATE_MODE_DEACTIVATED": {icon: "shield_off.svg", description: "Modo privado desactivado", category: "4"},
    "ALARM_STATE_ACTIVATED": {icon: "alarm_activate.svg", description: "Estado de alarma activado", category: "1"},
    "ALARM_STATE_DEACTIVATED": {icon: "alarm_deactivate.svg", description: "Estado de alarma desactivado", category: "1"},
    "CLAXON_ACTIVATED": {icon: "speaker_on.svg", description: "Claxón activado", category: "4"},
    "CLAXON_DEACTIVATED": {icon: "speaker_off.svg", description: "Claxón desactivado", category: "4"},
    "WARNER_ACTIVATED": {icon: "warning_on.svg", description: "Warning activado", category: "4"},
    "WARNER_DEACTIVATED": {icon: "warning_off.svg", description: "Warning desactivado", category: "4"},
    "POWERSWITCH_ACTIVATED": {icon: "electric_on.svg", description: "Alimentación activada", category: "4"},
    "POWERSWITCH_DEACTIVATED": {icon: "electric_off.svg", description: "Alimentación desactivada", category: "4"},
    "SPEAKER_ACTIVATED": {icon: "speaker_on.svg", description: "Altavoz activado", category: "4"},
    "SPEAKER_DEACTIVATED": {icon: "speaker_off.svg", description: "Altavoz desactivado", category: "4"},
    "ALARM_MODE_ACTIVATED": {icon: "warning_on.svg", description: "Modo de alarma activado", category: "4"},
    "ALARM_MODE_DEACTIVATED": {icon: "warning_off.svg", description: "Modo de alarma desactivado", category: "4"},
    "STOP_TIME_EXCEEDED": {icon: "stop_time.svg", description: "Tiempo de parada excedido", category: "0"},
    "BRACELET_BREAK_ACTIVATED": {icon: "bracelet_on.svg", description: "Apertura de brazalete activado", category: "1"},
    "BRACELET_BREAK_DEACTIVATED": {icon: "bracelet_off.svg", description: "Apertura de brazalete desactivado", category: "1"},
    "BRACELET_HANDLING_ACTIVATED": {icon: "bracelet_on.svg", description: "Brazalete activado", category: "1"},
    "BRACELET_HANDLING_DEACTIVATED": {icon: "bracelet_off.svg", description: "Brazalete desactivado", category: "1"},
    "DEAD_MAN_ACTIVATED": {icon: "deadman_on.svg", description: "Hombre muerto activado", category: "1"},
    "DEAD_MAN_DEACTIVATED": {icon: "deadman_off.svg", description: "Hombre muerto desactivado", category: "1"},
    "AGGRESSOR_APPROACHING_ACTIVATED": {icon: "aggressor_on.svg", description: "Cercanía de agresor activado", category: "1"},
    "AGGRESSOR_APPROACHING_DEACTIVATED": {icon: "aggressor_off.svg", description: "Cercanía de agresor desactivado", category: "1"},
    "AGGRESSOR_AWAY_ACTIVATED": {icon: "aggressor_on.svg", description: "Separación de agresor activado", category: "1"},
    "AGGRESSOR_AWAY_DEACTIVATED": {icon: "aggressor_off.svg", description: "Separación de agresor desactivado", category: "1"},
    "PLUG": {icon: "plug.svg", description: "Enchufado", category: "4"},
    "UNPLUG": {icon: "unplug.svg", description: "Desenchufado", category: "4"},
    "POSITION_TEST": {icon: "pin.svg", description: "Test de posición", category: "4"},
    "RALLYE_MAX_SPEED_EXCEEDED": {icon: "max_speed.svg", description: "Velocidad en rally excedida", category: "3"},
    "NOT_AUTHORIZED_STOP": {icon: "stop.svg", description: "Parada no autorizada", category: "1"},
    "NOT_AUTHORIZED_STOP_RALLY": {icon: "stop.svg", description: "Parada no autorizada en rally", category: "1"},
    "WORKING_SCHEDULE_KO": {icon: "calendar.svg", description: "Horario de trabajo", category: "3"},
    "OBLIGATORY_AREA_ACTIVATED": {icon: "obligatory_area.svg", description: "Zona obligatoria activada", category: "2"},
    "OBLIGATORY_AREA_DEACTIVATED": {icon: "obligatory_area.svg", description: "Zona obligatoria desactivada", category: "2"},
    "FORBIDDEN_AREA_ACTIVATED": {icon: "forbidden_area.svg", description: "Zona prohibida activada", category: "2"},
    "FORBIDDEN_AREA_DEACTIVATED": {icon: "forbidden_area.svg", description: "Zona prohibida desactivada", category: "2"},
    "GENERIC_AREA_ACTIVATED": {icon: "generic_area.svg", description: "Zona generica activada", category: "2"},
    "GENERIC_AREA_DEACTIVATED": {icon: "generic_area.svg", description: "Zona generica desactivada", category: "2"},
    "PROXIMITY_AREA_MAIN_ACTIVATED": {icon: "proximity_area.svg", description: "Zona de proximidad activada", category: "2"},
    "PROXIMITY_AREA_MAIN_DEACTIVATED": {icon: "proximity_area.svg", description: "Zona de proximidad desactivada", category: "2"},
    "DISTANCE_AREA_MAIN_ACTIVATED": {icon: "proximity_area.svg", description: "Zona de distancia activada", category: "2"},
    "DISTANCE_AREA_MAIN_DEACTIVATED": {icon: "proximity_area.svg", description: "Zona de distancia desactivada", category: "2"},
    "PROXIMITY_AREA_AFFECTED_ACTIVATED": {icon: "proximity_area.svg", description: "Zona de proximidad afectada activada", category: "2"},
    "PROXIMITY_AREA_AFFECTED_DEACTIVATED": {icon: "proximity_area.svg", description: "Zona de proximidad afectada desactivada", category: "2"},
    "DISTANCE_AREA_AFFECTED_ACTIVATED": {icon: "proximity_area.svg", description: "Zona de distancia afectada activada", category: "2"},
    "DISTANCE_AREA_AFFECTED_DEACTIVATED": {icon: "proximity_area.svg", description: "Zona de distancia afectada desactivada", category: "2"},
    "BEACON_IN": {icon: "beacon_in.svg", description: "Entrada en baliza", category: "2"},
    "BEACON_OUT": {icon: "beacon_out.svg", description: "Salida de baliza", category: "2"},
    "BEACON_JUMPED": {icon: "beacon_jump.svg", description: "Salto de baliza", category: "2"},
    "FRONT_SEAT_ACTIVATED": {icon: "seat_on.svg", description: "Cinturón delantero activado", category: "4"},
    "FRONT_SEAT_DEACTIVATED": {icon: "seat_off.svg", description: "Cinturón delantero desactivado", category: "4"},
    "BACK_SEAT_ACTIVATED": {icon: "seat_on.svg", description: "Cinturón trasero activado", category: "4"},
    "BACK_SEAT_DEACTIVATED": {icon: "seat_off.svg", description: "Cinturón trasero desactivado", category: "4"},
    "FLAG_DOWN": {icon: "flag_down.svg", description: "Bajada de bandera", category: "4"},
    "FLAG_UP": {icon: "flag_up.svg", description: "Subida de bandera", category: "4"},
    "TAXI_ZONE_ZERO": {icon: "taxi.svg", description: "Taxi zona 0", category: "4"},
    "TAXI_ZONE_ONE": {icon: "taxi.svg", description: "Taxi zona 1", category: "4"},
    "TAXI_ZONE_TWO": {icon: "taxi.svg", description: "Taxi zona 2", category: "4"},
    "TAXI_ZONE_THREE": {icon: "taxi.svg", description: "Taxi zona 3", category: "4"},
    "TAXI_DOOR_ACTIVATED": {icon: "door_on.svg", description: "Puerta de taxi activada", category: "4"},
    "TAXI_DOOR_DEACTIVATED": {icon: "door_off.svg", description: "Puerta de taxi desactivada", category: "4"},
    "FLAG_DOWN_TAXI_ZONE_ZERO": {icon: "flag_down.svg", description: "Bajada de bandera en zona 0", category: "4"},
    "FLAG_DOWN_TAXI_ZONE_ONE": {icon: "flag_down.svg", description: "Bajada de bandera en zona 1", category: "4"},
    "FLAG_DOWN_TAXI_ZONE_TWO": {icon: "flag_down.svg", description: "Bajada de bandera en zona 2", category: "4"},
    "FLAG_DOWN_TAXI_ZONE_THREE": {icon: "flag_down.svg", description: "Bajada de bandera en zona 3", category: "4"},
    "START_SPECIAL": {icon: "start.svg", description: "Arranque especial", category: "0"},
    "PAUSE_SPECIAL": {icon: "pause_button.svg", description: "Pausa especial", category: "0"},
    "STOP_SPECIAL": {icon: "stop.svg", description: "Parada especial", category: "0"},
    "PAUSE_VEHICLE": {icon: "pause_button.svg", description: "Pausa", category: "0"},
    "RESUME_VEHICLE": {icon: "play_button.svg", description: "Reanudar", category: "0"},
    "INIT_LOAD": {icon: "load_on.svg", description: "Inico de carga", category: "4"},
    "END_LOAD": {icon: "load_off.svg", description: "Fin de carga", category: "4"},
    "INIT_UNLOAD": {icon: "load_on.svg", description: "Inicio de descarga", category: "4"},
    "END_UNLOAD": {icon: "load_off.svg", description: "Fin de descarga", category: "4"},
    "STOP_NEAR_POI": {icon: "stop_poi.svg", description: "Parada con cercanía a PDI", category: "2"},
    "CHANGE_DRIVER": {icon: "taxi_driver.svg", description: "Cambio de conductor", category: "3"},
    "RECORD_POI": {icon: "poi_add.svg", description: "Guardar PDI", category: "2"},
    "DRIVING_HOURS_CONTROL": {icon: "watch.svg", description: "Control de horas de conducción", category: "3"},
    "DRIVING_HOURS_CONTROL_DESCANSO_SEMANAL_MENOR_24": {icon: "watch.svg", description: "Descanso semanal menor que 24h.", category: "3"},
    "DRIVING_HOURS_CONTROL_DESCANSO_SEMANAL_REDUCIDO_NO_PERMITIDO": {icon: "watch.svg", category: "3"},
    "DRIVING_HOURS_CONTROL_DESCANSO_SEMANAL_NO_COMPESA_DESCANSO_REDUCIDO": {icon: "watch.svg", description: "Descanso semanal no compensa el reducido", category: "3"},
    "DRIVING_HOURS_CONTROL_DESCANSO_DIARIO_REDUCIDO_INCORRECTO": {icon: "watch.svg", description: "Descanso reducido diario incorrecto", category: "3"},
    "DRIVING_HOURS_CONTROL_NO_HAY_DESCANSO_SEMANAL_O_DIARIO_EN_24": {icon: "watch.svg", description: "Sin descanso semanal o diario en 24h.", category: "3"},
    "DRIVING_HOURS_CONTROL_MAS_DE_10_HORAS_EN_EL_DIA": {icon: "watch.svg", description: "Conducción de más de 10h. en 1 día", category: "3"},
    "DRIVING_HOURS_CONTROL_EXCESO_CONDUCCION_DIA_2_DIAS_MAS_DE_9_HORAS": {icon: "watch.svg", description: "Conducción con más de 2 días de 9h.", category: "3"},
    "INDRIVING_HOURS_CONTROL_EXCESO_CONDUCCION_SEMANA_ACTUAL": {icon: "watch.svg", description: "Exceso de conducción semanal", category: "3"},
    "DRIVING_HOURS_CONTROL_EXCESO_CONDUCCION_BISEMANAL": {icon: "watch.svg", description: "Exceso de conducción bisemanal", category: "3"},
    "DRIVING_HOURS_CONTROL_EXCESO_DE_CONDUCCION_INITERRUMPIDA": {icon: "watch.svg", description: "Exceso de conducción ininterrupida", category: "3"},
    "DRIVING_HOURS_CONTROL_DESCANSOS_CONDUCCION_INSUFICIENTES": {icon: "watch.svg", description: "Descansos de conducción insuficiente", category: "3"},
    "INTERVENTION": {icon: "intervention.svg", description: "Intervención", category: "4"},
    "GATHERING": {icon: "gathering.svg", description: "Agrupación", category: "4"},
    "INDOOR_PANIC": {icon: "siren.svg", description: "Pánico indoor", category: "1"},
    "TRACKING_INDOOR": {icon: "pin_home.svg", description: "Tracking indoor", category: "4"},
    "DBUSCA_PHOTO": {icon: "camera.svg", description: "Foto dbusca", category: "4"},
    "TAMPERING": {icon: "tampering.svg", description: "Manipulación", category: "1"},
    "TEMP0": {icon: "thermometer.svg", description: "Temperatura", category: "4"},
    "TEMP1": {icon: "thermometer.svg", description: "Temperatura", category: "4"},
    "TEMP2": {icon: "thermometer.svg", description: "Temperatura", category: "4"},
    "TEMP3": {icon: "thermometer.svg", description: "Temperatura", category: "4"},
    "HARSH_ACCELERATION": {icon: "harsh_acceleration.svg", description: "Aceleración brusca", category: "3"},
    "HARSH_BRAKING": {icon: "harsh_braking.svg", description: "Frenazo brusco", category: "3"},
    "PROXIMITY": {icon: "gathering.svg", description: "Proximidad", category: "2"},
    "OYSTA_PERSONAL_EVENT": {icon: "info.svg", description: "Evento personal Oysta", category: "4"},
    "OYSTA_CANNED_EVENT": {icon: "info.svg", description: "Evento Oysta", category: "4"},
    "OYSTA_WAYPOINT_EVENT": {icon: "info.svg", description: "Evento de waypoint Oysta", category: "4"},
    "OYSTA_NFC_EVENT": {icon: "info.svg", description: "NFC Oysta", category: "4"},
    "MAX_TIME_INACTIVITY": {icon: "snail.svg", description: "Inactividad excedida", category: "4"},
    "BATTERY_CHARGING": {icon: "battery.svg", description: "Carga de bateria", category: "4"},
    "AMBER_ALERT": {icon: "warning.svg", description: "Alerta ambar", category: "1"},
    "POWER_ON": {icon: "power_on.svg", description: "Encendido", category: "0"},
    "POWER_OFF": {icon: "power_off.svg", description: "Apagado", category: "0"},
    "CHECKIN": {icon: "checked.svg", description: "Chequeo", category: "4"},
    "EHEALTH": {icon: "health.svg", description: "e-health", category: "4"},
    "EMPTY_BATTERY": {icon: "battery_empty.svg", description: "Bataría agotada", category: "4"},
    "RECOVER_BATTERY": {icon: "battery_full.svg", description: "Bateria recuperada", category: "4"},
    "HARSH_CORNERING": {icon: "harsh_cornering.svg", description: "Curva brusca", category: "3"},
    "RPM": {icon: "rpm.svg", description: "RPM", category: "3"},
    "TEMP": {icon: "thermometer.svg", description: "Temperatura", category: "4"},
    "SENSOR_RANGE": {icon: "thermometer.svg", description: "Rango de sensor", category: "4"},
    "BATTERY_CHARGING_OFF": {icon: "battery_empty.svg", description: "Carga de batería apagada", category: "4"},
    "OVERSPEED_AREA_ACTIVATED": {icon: "max_speed.svg", description: "Zona de velocidad excesiva activada", category: "3"},
    "BATTERY_LEVEL": {icon: "battery_level.svg", description: "Nivel de batería", category: "4"},
    "EVENT_OF_VEHICLE_OR_PERSONAL_DEVICE": {icon: "info.svg", description: "Manual", category: "4"},    
    "DRIVER_IDENTIFICATION_ON": {icon: "identification_on.svg", description: "Identificación del conductor activada", category: "3"},
    "DRIVER_IDENTIFICATION_OFF": {icon: "identification_off.svg", description: "Identificación del conductor desactivada", category: "3"},
    "BEACON_NFC_READ": {icon: "beacon_in.svg", description: "Lectura de baliza NFC", category: "2"},
    "BEACON_NFC_JUMPED": {icon: "beacon_jump.svg", description: "Salto de baliza NFC", category: "2"},
    "SCAN_EVENT": {icon: "scanner.svg", description: "Evento de escaner", category: "4"},
    "RESTART": {icon: "power_reinit.svg", description: "Reinicio", category: "4"},
    "BT_EVENT": {icon: "bluetooth.svg", description: "Evento BT", category: "4"},
    "STOP_IN_AREA": {icon: "stop.svg", description: "Parada en zona", category: "2"},
    "SIDE_DOOR_OPENING": {icon: "door_on.svg", description: "Apertura de puerta lateral", category: "4"},
    "SIDE_DOOR_CLOSING": {icon: "door_off.svg", description: "Cierre de puerta lateral", category: "4"},
    "BACK_DOOR_OPENING": {icon: "door_on.svg", description: "Apertura de puerta trasera", category: "4"},
    "BACK_DOOR_CLOSING": {icon: "door_off.svg", description: "Cierre de puerta trasera", category: "4"},
    "JAMMER": {icon: "jammer.svg", description: "Inhibidor GPS", category: "1"},
    "CHECK_IN_ALREADY_DONE": {icon: "info.svg", description: "Registro de entrada ya realizado", category: "4"},
    "CHECK_IN": {icon: "info.svg", description: "Registro de entrada", category: "4"},
    "CHECK_OUT": {icon: "info.svg", description: "Registro de salida", category: "4"},
    "JOB_OPEN": {icon: "info.svg", description: "Apertura de trabajo", category: "4"},
    "JOB_CLOSED": {icon: "info.svg", description: "Cierre de trabajo", category: "4"},
    "CHECK_OUT_WITHOUT_CHECK_IN": {icon: "info.svg", description: "Registro de salida sin entrada previa", category: "4"},
    "JOB_PAUSED_BREAKFAST": {icon: "info.svg", description: "Trabajo pausado para el desayuno", category: "4"},
    "JOB_RESUMED_BREAKFAST": {icon: "info.svg", description: "Trabajo reanudado después del desayuno", category: "4"},
    "JOB_PAUSED_LUNCH": {icon: "info.svg", description: "Trabajo pausado para la comida", category: "4"},
    "JOB_RESUMED_LUNCH": {icon: "info.svg", description: "Trabajo reanudado después de la comida", category: "4"},
    "JOB_PAUSED_DINNER": {icon: "info.svg", description: "Trabajo pausado para la cena", category: "4"},
    "JOB_RESUMED_DINNER": {icon: "info.svg", description: "Trabajo reanudado después del cena", category: "4"},
    "SYSTEM_AREA_ACTIVATED": {icon: "info.svg", description: "Área de sistema activada", category: "4"},
    "SYSTEM_AREA_DEACTIVATED": {icon: "info.svg", description: "Área de sistema desactivada", category: "4"},

  }
};

