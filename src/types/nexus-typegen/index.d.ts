/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "../../apollo/context"
import * as db from ".prisma/client"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  LineData: { // input type
    lineRows: NexusGenInputs['LineRowData'][]; // [LineRowData!]!
    player: string; // String!
  }
  LineRowData: { // input type
    number?: number | null; // Int
    text: string; // String!
  }
  LineRowWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  LineWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  PlayData: { // input type
    description: string; // String!
    image: string; // String!
    imageLicenseCode: string; // String!
    imageLicenseUrl: string; // String!
    scenes: NexusGenInputs['SceneData'][]; // [SceneData!]!
    title: string; // String!
  }
  PlayWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  SceneData: { // input type
    actNum: number; // Int!
    lines: NexusGenInputs['LineData'][]; // [LineData!]!
    sceneNum: number; // Int!
  }
  SceneWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenRootTypes {
  Line: db.Line;
  LineRow: db.LineRow;
  Mutation: {};
  Play: db.Play;
  Query: {};
  Scene: db.Scene;
  User: db.User;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  LineData: NexusGenInputs['LineData'];
  LineRowData: NexusGenInputs['LineRowData'];
  LineRowWhereUniqueInput: NexusGenInputs['LineRowWhereUniqueInput'];
  LineWhereUniqueInput: NexusGenInputs['LineWhereUniqueInput'];
  PlayData: NexusGenInputs['PlayData'];
  PlayWhereUniqueInput: NexusGenInputs['PlayWhereUniqueInput'];
  SceneData: NexusGenInputs['SceneData'];
  SceneWhereUniqueInput: NexusGenInputs['SceneWhereUniqueInput'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
}

export interface NexusGenFieldTypes {
  Line: { // field return type
    id: number; // Int!
    index: number; // Int!
    lineRows: NexusGenRootTypes['LineRow'][]; // [LineRow!]!
    player: string; // String!
    scene: NexusGenRootTypes['Scene'] | null; // Scene
    sceneId: number | null; // Int
  }
  LineRow: { // field return type
    id: number; // Int!
    index: number; // Int!
    line: NexusGenRootTypes['Line'] | null; // Line
    lineId: number | null; // Int
    number: number | null; // Int
    text: string; // String!
  }
  Mutation: { // field return type
    createPlay: NexusGenRootTypes['Play'] | null; // Play
    deletePlay: NexusGenRootTypes['Play'] | null; // Play
  }
  Play: { // field return type
    description: string; // String!
    id: number; // Int!
    image: string; // String!
    imageLicenseCode: string; // String!
    imageLicenseUrl: string; // String!
    scenes: NexusGenRootTypes['Scene'][]; // [Scene!]!
    title: string; // String!
  }
  Query: { // field return type
    line: NexusGenRootTypes['Line'] | null; // Line
    lineRow: NexusGenRootTypes['LineRow'] | null; // LineRow
    play: NexusGenRootTypes['Play'] | null; // Play
    plays: NexusGenRootTypes['Play'][]; // [Play!]!
    scene: NexusGenRootTypes['Scene'] | null; // Scene
    user: NexusGenRootTypes['User'] | null; // User
  }
  Scene: { // field return type
    actNum: number; // Int!
    id: number; // Int!
    index: number; // Int!
    lines: NexusGenRootTypes['Line'][]; // [Line!]!
    play: NexusGenRootTypes['Play'] | null; // Play
    playId: number | null; // Int
    sceneNum: number; // Int!
  }
  User: { // field return type
    displayName: string | null; // String
    email: string | null; // String
    googleId: string | null; // String
    id: string | null; // ID
    name: string | null; // String
    picture: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Line: { // field return type name
    id: 'Int'
    index: 'Int'
    lineRows: 'LineRow'
    player: 'String'
    scene: 'Scene'
    sceneId: 'Int'
  }
  LineRow: { // field return type name
    id: 'Int'
    index: 'Int'
    line: 'Line'
    lineId: 'Int'
    number: 'Int'
    text: 'String'
  }
  Mutation: { // field return type name
    createPlay: 'Play'
    deletePlay: 'Play'
  }
  Play: { // field return type name
    description: 'String'
    id: 'Int'
    image: 'String'
    imageLicenseCode: 'String'
    imageLicenseUrl: 'String'
    scenes: 'Scene'
    title: 'String'
  }
  Query: { // field return type name
    line: 'Line'
    lineRow: 'LineRow'
    play: 'Play'
    plays: 'Play'
    scene: 'Scene'
    user: 'User'
  }
  Scene: { // field return type name
    actNum: 'Int'
    id: 'Int'
    index: 'Int'
    lines: 'Line'
    play: 'Play'
    playId: 'Int'
    sceneNum: 'Int'
  }
  User: { // field return type name
    displayName: 'String'
    email: 'String'
    googleId: 'String'
    id: 'ID'
    name: 'String'
    picture: 'String'
  }
}

export interface NexusGenArgTypes {
  Line: {
    lineRows: { // args
      after?: NexusGenInputs['LineRowWhereUniqueInput'] | null; // LineRowWhereUniqueInput
      before?: NexusGenInputs['LineRowWhereUniqueInput'] | null; // LineRowWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Mutation: {
    createPlay: { // args
      play: NexusGenInputs['PlayData']; // PlayData!
    }
    deletePlay: { // args
      id: number; // Int!
    }
  }
  Play: {
    scenes: { // args
      after?: NexusGenInputs['SceneWhereUniqueInput'] | null; // SceneWhereUniqueInput
      before?: NexusGenInputs['SceneWhereUniqueInput'] | null; // SceneWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Query: {
    line: { // args
      where: NexusGenInputs['LineWhereUniqueInput']; // LineWhereUniqueInput!
    }
    lineRow: { // args
      where: NexusGenInputs['LineRowWhereUniqueInput']; // LineRowWhereUniqueInput!
    }
    play: { // args
      where: NexusGenInputs['PlayWhereUniqueInput']; // PlayWhereUniqueInput!
    }
    plays: { // args
      after?: NexusGenInputs['PlayWhereUniqueInput'] | null; // PlayWhereUniqueInput
      before?: NexusGenInputs['PlayWhereUniqueInput'] | null; // PlayWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    scene: { // args
      where: NexusGenInputs['SceneWhereUniqueInput']; // SceneWhereUniqueInput!
    }
  }
  Scene: {
    lines: { // args
      after?: NexusGenInputs['LineWhereUniqueInput'] | null; // LineWhereUniqueInput
      before?: NexusGenInputs['LineWhereUniqueInput'] | null; // LineWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Line" | "LineRow" | "Mutation" | "Play" | "Query" | "Scene" | "User";

export type NexusGenInputNames = "LineData" | "LineRowData" | "LineRowWhereUniqueInput" | "LineWhereUniqueInput" | "PlayData" | "PlayWhereUniqueInput" | "SceneData" | "SceneWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}