import {
    HydraAdmin,
    ResourceGuesser,
    EditGuesser,
    CreateGuesser,
    InputGuesser
} from "@api-platform/admin";

import { Route } from 'react-router-dom';

import  { DateInput, ReferenceInput, SelectInput } from "react-admin";

import {Home} from "./Home";
import {AppLayout} from "../components/Layout";
import TeamEdit from "./TeamEdit";

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
      <ReferenceInput source="player" reference="players" perPage="1000">
        <SelectInput optionText={playerName} />
      </ReferenceInput>
      <InputGuesser source="gameDay"/>
      <InputGuesser source="team"/>
    </CreateGuesser>
  );


export default () => {
    let customRoutes = [
      <Route exact path="/teamEdit/:teamNum" component={TeamEdit} />
    ];
    return (
        <HydraAdmin layout={AppLayout} entrypoint={window.origin} dashboard={Home} customRoutes={customRoutes}>
            <ResourceGuesser name="players" />
            <ResourceGuesser name="teams" />
            <ResourceGuesser name="divisions" />
            <ResourceGuesser name="game_days" edit={GameDayEdit} create={GameDayCreate}/>
            <ResourceGuesser name="participations" create={ParticipationCreate}/>
        </HydraAdmin>
    );
}