import {
    HydraAdmin,
    ResourceGuesser,
    EditGuesser,
    CreateGuesser,
    InputGuesser
} from "@api-platform/admin";

import  { DateInput, ReferenceInput, SelectInput } from "react-admin";

import {Home} from "./Home";
import {AppLayout} from "../components/Layout";

export const GameDayEdit = props => (
    <EditGuesser {...props}>
      <InputGuesser source="number">0</InputGuesser>
      <DateInput source="date"/>
    </EditGuesser>
  );
  
  export const GameDayCreate = props => (
    <CreateGuesser {...props}>
      <InputGuesser source="number"/>
      <DateInput source="date"/>
    </CreateGuesser>
  );
  
  export const playerName = (record) => {
    return record.firstname + " " + record.lastname;
  }
  
  export const ParticipationCreate = props => (
    <CreateGuesser {...props}>
      <ReferenceInput source="player" reference="players">
        <SelectInput optionText={playerName} />
      </ReferenceInput>
      <InputGuesser source="gameDay"/>
      <InputGuesser source="team"/>
    </CreateGuesser>
  );


export default () => {
    return (
        <HydraAdmin layout={AppLayout} entrypoint={window.origin} dashboard={Home}>
            <ResourceGuesser name="players" />
            <ResourceGuesser name="teams" />
            <ResourceGuesser name="divisions" />
            <ResourceGuesser name="game_days" edit={GameDayEdit} create={GameDayCreate}/>
            <ResourceGuesser name="participations" create={ParticipationCreate}/>
        </HydraAdmin>
    );
}