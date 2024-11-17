import { AddApiKeyResponse, AddOrUpdateObjectProps, ApiKey, AssignUserIdProps, BatchAssignUserIdsProps, BatchDictionaryEntriesProps, BatchParams, BatchProps, BatchResponse, BrowseOptions, BrowseProps, BrowseResponse, ChunkedBatchOptions, ClearObjectsProps, ClearRulesProps, ClearSynonymsProps, CreatedAtResponse, CustomDeleteProps, CustomGetProps, CustomPostProps, CustomPutProps, DeleteApiKeyProps, DeleteApiKeyResponse, DeleteByProps, DeletedAtResponse, DeleteIndexProps, DeleteObjectProps, DeleteObjectsOptions, DeleteRuleProps, DeleteSourceProps, DeleteSourceResponse, DeleteSynonymProps, DictionarySettingsParams, GetApiKeyProps, GetApiKeyResponse, GetAppTaskProps, GetDictionarySettingsResponse, GetLogsProps, GetLogsResponse, GetObjectProps, GetObjectsParams, GetObjectsResponse, GetRuleProps, GetSettingsProps, GetSynonymProps, GetTaskProps, GetTaskResponse, GetTopUserIdsResponse, GetUserIdProps, HasPendingMappingsProps, HasPendingMappingsResponse, Languages, LegacySearchMethodProps, ListApiKeysResponse, ListClustersResponse, ListIndicesProps, ListIndicesResponse, ListUserIdsProps, ListUserIdsResponse, MultipleBatchResponse, OperationIndexProps, PartialUpdateObjectProps, PartialUpdateObjectsOptions, RemoveUserIdProps, RemoveUserIdResponse, ReplaceAllObjectsOptions, ReplaceAllObjectsResponse, ReplaceSourceResponse, ReplaceSourcesProps, RestoreApiKeyProps, Rule, SaveObjectProps, SaveObjectResponse, SaveObjectsOptions, SaveRuleProps, SaveRulesProps, SaveSynonymProps, SaveSynonymResponse, SaveSynonymsProps, SearchClient, SearchDictionaryEntriesProps, SearchDictionaryEntriesResponse, SearchForFacetValuesProps, SearchForFacetValuesResponse, SearchMethodParams, SearchResponse, SearchResponses, SearchRulesProps, SearchRulesResponse, SearchSingleIndexProps, SearchSynonymsProps, SearchSynonymsResponse, SearchUserIdsParams, SearchUserIdsResponse, SetSettingsProps, SettingsResponse, Source, SynonymHit, UpdateApiKeyProps, UpdateApiKeyResponse, UpdatedAtResponse, UpdatedAtWithObjectIdResponse, UpdatedRuleResponse, UserId, WaitForApiKeyOptions, WaitForAppTaskOptions, WaitForTaskOptions } from "@algolia/client-search";
import { Transporter, RequestOptions } from "@algolia/client-common";


export class FakeSearchClient implements SearchClient {
  transporter: Transporter;
  appId: string;
  public saveObjectsCalled: boolean = false;
  public deleteObjectCalled: boolean = false;

  clearCache(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  _ua: string;
  addAlgoliaAgent(segment: string, version?: string): void {
    throw new Error("Method not implemented.");
  }
  setClientApiKey({ apiKey }: { apiKey: string; }): void {
    throw new Error("Method not implemented.");
  }
  waitForTask({ indexName, taskID, maxRetries, timeout, }: WaitForTaskOptions, requestOptions?: RequestOptions): Promise<GetTaskResponse> {
    throw new Error("Method not implemented.");
  }
  waitForAppTask({ taskID, maxRetries, timeout, }: WaitForAppTaskOptions, requestOptions?: RequestOptions): Promise<GetTaskResponse> {
    throw new Error("Method not implemented.");
  }
  waitForApiKey({ operation, key, apiKey, maxRetries, timeout, }: WaitForApiKeyOptions, requestOptions?: RequestOptions): Promise<GetApiKeyResponse | undefined> {
    throw new Error("Method not implemented.");
  }
  browseObjects<T>({ indexName, browseParams, ...browseObjectsOptions }: BrowseOptions<BrowseResponse<T>> & BrowseProps, requestOptions?: RequestOptions): Promise<BrowseResponse<T>> {
    throw new Error("Method not implemented.");
  }
  browseRules({ indexName, searchRulesParams, ...browseRulesOptions }: BrowseOptions<SearchRulesResponse> & SearchRulesProps, requestOptions?: RequestOptions): Promise<SearchRulesResponse> {
    throw new Error("Method not implemented.");
  }
  browseSynonyms({ indexName, searchSynonymsParams, ...browseSynonymsOptions }: BrowseOptions<SearchSynonymsResponse> & SearchSynonymsProps, requestOptions?: RequestOptions): Promise<SearchSynonymsResponse> {
    throw new Error("Method not implemented.");
  }
  chunkedBatch({ indexName, objects, action, waitForTasks, batchSize }: ChunkedBatchOptions, requestOptions?: RequestOptions): Promise<Array<BatchResponse>> {
    throw new Error("Method not implemented.");
  }
  saveObjects({ indexName, objects, waitForTasks }: SaveObjectsOptions, requestOptions?: RequestOptions): Promise<BatchResponse[]> {
    this.saveObjectsCalled = true;
    return Promise.resolve([]);
  }
  deleteObjects({ indexName, objectIDs, waitForTasks }: DeleteObjectsOptions, requestOptions?: RequestOptions): Promise<BatchResponse[]> {
    throw new Error("Method not implemented.");
  }
  partialUpdateObjects({ indexName, objects, createIfNotExists, waitForTasks }: PartialUpdateObjectsOptions, requestOptions?: RequestOptions): Promise<BatchResponse[]> {
    throw new Error("Method not implemented.");
  }
  replaceAllObjects({ indexName, objects, batchSize }: ReplaceAllObjectsOptions, requestOptions?: RequestOptions): Promise<ReplaceAllObjectsResponse> {
    throw new Error("Method not implemented.");
  }
  indexExists({ indexName }: GetSettingsProps): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  searchForHits<T>(searchMethodParams: LegacySearchMethodProps | SearchMethodParams, requestOptions?: RequestOptions): Promise<{ results: Array<SearchResponse<T>>; }> {
    throw new Error("Method not implemented.");
  }
  searchForFacets(searchMethodParams: LegacySearchMethodProps | SearchMethodParams, requestOptions?: RequestOptions): Promise<{ results: Array<SearchForFacetValuesResponse>; }> {
    throw new Error("Method not implemented.");
  }
  addApiKey(apiKey: ApiKey, requestOptions?: RequestOptions): Promise<AddApiKeyResponse> {
    throw new Error("Method not implemented.");
  }
  addOrUpdateObject({ indexName, objectID, body }: AddOrUpdateObjectProps, requestOptions?: RequestOptions): Promise<UpdatedAtWithObjectIdResponse> {
    throw new Error("Method not implemented.");
  }
  appendSource(source: Source, requestOptions?: RequestOptions): Promise<CreatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  assignUserId({ xAlgoliaUserID, assignUserIdParams }: AssignUserIdProps, requestOptions?: RequestOptions): Promise<CreatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  batch({ indexName, batchWriteParams }: BatchProps, requestOptions?: RequestOptions): Promise<BatchResponse> {
    throw new Error("Method not implemented.");
  }
  batchAssignUserIds({ xAlgoliaUserID, batchAssignUserIdsParams }: BatchAssignUserIdsProps, requestOptions?: RequestOptions): Promise<CreatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  batchDictionaryEntries({ dictionaryName, batchDictionaryEntriesParams }: BatchDictionaryEntriesProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  browse<T>({ indexName, browseParams }: BrowseProps, requestOptions?: RequestOptions): Promise<BrowseResponse<T>> {
    throw new Error("Method not implemented.");
  }
  clearObjects({ indexName }: ClearObjectsProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  clearRules({ indexName, forwardToReplicas }: ClearRulesProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  clearSynonyms({ indexName, forwardToReplicas }: ClearSynonymsProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  customDelete({ path, parameters }: CustomDeleteProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>> {
    throw new Error("Method not implemented.");
  }
  customGet({ path, parameters }: CustomGetProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>> {
    throw new Error("Method not implemented.");
  }
  customPost({ path, parameters, body }: CustomPostProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>> {
    throw new Error("Method not implemented.");
  }
  customPut({ path, parameters, body }: CustomPutProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>> {
    throw new Error("Method not implemented.");
  }
  deleteApiKey({ key }: DeleteApiKeyProps, requestOptions?: RequestOptions): Promise<DeleteApiKeyResponse> {
    throw new Error("Method not implemented.");
  }
  deleteBy({ indexName, deleteByParams }: DeleteByProps, requestOptions?: RequestOptions): Promise<DeletedAtResponse> {
    throw new Error("Method not implemented.");
  }
  deleteIndex({ indexName }: DeleteIndexProps, requestOptions?: RequestOptions): Promise<DeletedAtResponse> {
    throw new Error("Method not implemented.");
  }
  deleteObject({ indexName, objectID }: DeleteObjectProps, requestOptions?: RequestOptions): Promise<DeletedAtResponse> {
    this.deleteObjectCalled = true;
    return Promise.resolve({ taskID: 0, deletedAt: "" });
  }
  deleteRule({ indexName, objectID, forwardToReplicas }: DeleteRuleProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  deleteSource({ source }: DeleteSourceProps, requestOptions?: RequestOptions): Promise<DeleteSourceResponse> {
    throw new Error("Method not implemented.");
  }
  deleteSynonym({ indexName, objectID, forwardToReplicas }: DeleteSynonymProps, requestOptions?: RequestOptions): Promise<DeletedAtResponse> {
    throw new Error("Method not implemented.");
  }
  getApiKey({ key }: GetApiKeyProps, requestOptions?: RequestOptions): Promise<GetApiKeyResponse> {
    throw new Error("Method not implemented.");
  }
  getAppTask({ taskID }: GetAppTaskProps, requestOptions?: RequestOptions): Promise<GetTaskResponse> {
    throw new Error("Method not implemented.");
  }
  getDictionaryLanguages(requestOptions?: RequestOptions): Promise<{ [key: string]: Languages; }> {
    throw new Error("Method not implemented.");
  }
  getDictionarySettings(requestOptions?: RequestOptions): Promise<GetDictionarySettingsResponse> {
    throw new Error("Method not implemented.");
  }
  getLogs({ offset, length, indexName, type }?: GetLogsProps, requestOptions?: RequestOptions | undefined): Promise<GetLogsResponse> {
    throw new Error("Method not implemented.");
  }
  getObject({ indexName, objectID, attributesToRetrieve }: GetObjectProps, requestOptions?: RequestOptions): Promise<Record<string, unknown>> {
    throw new Error("Method not implemented.");
  }
  getObjects<T>(getObjectsParams: GetObjectsParams, requestOptions?: RequestOptions): Promise<GetObjectsResponse<T>> {
    throw new Error("Method not implemented.");
  }
  getRule({ indexName, objectID }: GetRuleProps, requestOptions?: RequestOptions): Promise<Rule> {
    throw new Error("Method not implemented.");
  }
  getSettings({ indexName }: GetSettingsProps, requestOptions?: RequestOptions): Promise<SettingsResponse> {
    throw new Error("Method not implemented.");
  }
  getSources(requestOptions?: RequestOptions): Promise<Array<Source>> {
    throw new Error("Method not implemented.");
  }
  getSynonym({ indexName, objectID }: GetSynonymProps, requestOptions?: RequestOptions): Promise<SynonymHit> {
    throw new Error("Method not implemented.");
  }
  getTask({ indexName, taskID }: GetTaskProps, requestOptions?: RequestOptions): Promise<GetTaskResponse> {
    throw new Error("Method not implemented.");
  }
  getTopUserIds(requestOptions?: RequestOptions): Promise<GetTopUserIdsResponse> {
    throw new Error("Method not implemented.");
  }
  getUserId({ userID }: GetUserIdProps, requestOptions?: RequestOptions): Promise<UserId> {
    throw new Error("Method not implemented.");
  }
  hasPendingMappings({ getClusters }?: HasPendingMappingsProps, requestOptions?: RequestOptions | undefined): Promise<HasPendingMappingsResponse> {
    throw new Error("Method not implemented.");
  }
  listApiKeys(requestOptions?: RequestOptions): Promise<ListApiKeysResponse> {
    throw new Error("Method not implemented.");
  }
  listClusters(requestOptions?: RequestOptions): Promise<ListClustersResponse> {
    throw new Error("Method not implemented.");
  }
  listIndices({ page, hitsPerPage }?: ListIndicesProps, requestOptions?: RequestOptions | undefined): Promise<ListIndicesResponse> {
    throw new Error("Method not implemented.");
  }
  listUserIds({ page, hitsPerPage }?: ListUserIdsProps, requestOptions?: RequestOptions | undefined): Promise<ListUserIdsResponse> {
    throw new Error("Method not implemented.");
  }
  multipleBatch(batchParams: BatchParams, requestOptions?: RequestOptions): Promise<MultipleBatchResponse> {
    throw new Error("Method not implemented.");
  }
  operationIndex({ indexName, operationIndexParams }: OperationIndexProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  partialUpdateObject({ indexName, objectID, attributesToUpdate, createIfNotExists }: PartialUpdateObjectProps, requestOptions?: RequestOptions): Promise<UpdatedAtWithObjectIdResponse> {
    throw new Error("Method not implemented.");
  }
  removeUserId({ userID }: RemoveUserIdProps, requestOptions?: RequestOptions): Promise<RemoveUserIdResponse> {
    throw new Error("Method not implemented.");
  }
  replaceSources({ source }: ReplaceSourcesProps, requestOptions?: RequestOptions): Promise<ReplaceSourceResponse> {
    throw new Error("Method not implemented.");
  }
  restoreApiKey({ key }: RestoreApiKeyProps, requestOptions?: RequestOptions): Promise<AddApiKeyResponse> {
    throw new Error("Method not implemented.");
  }
  saveObject({ indexName, body }: SaveObjectProps, requestOptions?: RequestOptions): Promise<SaveObjectResponse> {
    throw new Error("Method not implemented.");
  }
  saveRule({ indexName, objectID, rule, forwardToReplicas }: SaveRuleProps, requestOptions?: RequestOptions): Promise<UpdatedRuleResponse> {
    throw new Error("Method not implemented.");
  }
  saveRules({ indexName, rules, forwardToReplicas, clearExistingRules }: SaveRulesProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  saveSynonym({ indexName, objectID, synonymHit, forwardToReplicas }: SaveSynonymProps, requestOptions?: RequestOptions): Promise<SaveSynonymResponse> {
    throw new Error("Method not implemented.");
  }
  saveSynonyms({ indexName, synonymHit, forwardToReplicas, replaceExistingSynonyms }: SaveSynonymsProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  search<T>(searchMethodParams: SearchMethodParams | LegacySearchMethodProps, requestOptions?: RequestOptions): Promise<SearchResponses<T>> {
    throw new Error("Method not implemented.");
  }
  searchDictionaryEntries({ dictionaryName, searchDictionaryEntriesParams }: SearchDictionaryEntriesProps, requestOptions?: RequestOptions): Promise<SearchDictionaryEntriesResponse> {
    throw new Error("Method not implemented.");
  }
  searchForFacetValues({ indexName, facetName, searchForFacetValuesRequest }: SearchForFacetValuesProps, requestOptions?: RequestOptions): Promise<SearchForFacetValuesResponse> {
    throw new Error("Method not implemented.");
  }
  searchRules({ indexName, searchRulesParams }: SearchRulesProps, requestOptions?: RequestOptions): Promise<SearchRulesResponse> {
    throw new Error("Method not implemented.");
  }
  searchSingleIndex<T>({ indexName, searchParams }: SearchSingleIndexProps, requestOptions?: RequestOptions): Promise<SearchResponse<T>> {
    throw new Error("Method not implemented.");
  }
  searchSynonyms({ indexName, searchSynonymsParams }: SearchSynonymsProps, requestOptions?: RequestOptions): Promise<SearchSynonymsResponse> {
    throw new Error("Method not implemented.");
  }
  searchUserIds(searchUserIdsParams: SearchUserIdsParams, requestOptions?: RequestOptions): Promise<SearchUserIdsResponse> {
    throw new Error("Method not implemented.");
  }
  setDictionarySettings(dictionarySettingsParams: DictionarySettingsParams, requestOptions?: RequestOptions): Promise<UpdatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  setSettings({ indexName, indexSettings, forwardToReplicas }: SetSettingsProps, requestOptions?: RequestOptions): Promise<UpdatedAtResponse> {
    throw new Error("Method not implemented.");
  }
  updateApiKey({ key, apiKey }: UpdateApiKeyProps, requestOptions?: RequestOptions): Promise<UpdateApiKeyResponse> {
    throw new Error("Method not implemented.");
  }

}
