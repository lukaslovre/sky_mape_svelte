<script lang="ts">
  import CheckmarkIcon from "../../../assets/icons/CheckmarkIcon.svelte";
  import CopyableHeaderCell from "./CopyableHeaderCell.svelte";

  interface Props {
    toggleSelectAll: () => void;
    isSelectAll: boolean;
    columnsLabels: string[];
    getSelectedAttributes: (columnName: string) => string[];
    copyableColumnsLabels: string[];
    sortOptionLabel?: string;
  }

  let {
    toggleSelectAll,
    isSelectAll,
    columnsLabels,
    getSelectedAttributes,
    copyableColumnsLabels,
    sortOptionLabel,
  }: Props = $props();
</script>

<thead>
  <tr>
    <th>
      <input
        type="checkbox"
        name="selectAll"
        id="selectAll"
        checked={isSelectAll}
        onchange={toggleSelectAll}
      />
      <label for="selectAll">
        <CheckmarkIcon />
      </label>
    </th>
    {#each columnsLabels as columnLable (columnLable)}
      {#if copyableColumnsLabels.includes(columnLable)}
        <CopyableHeaderCell label={columnLable} {getSelectedAttributes} />
      {:else}
        <th class:isSorting={sortOptionLabel === columnLable}>{columnLable}</th>
      {/if}
    {/each}
  </tr>
</thead>

<style>
  th,
  td {
    /* border: 1px solid hsl(0, 0%, 90%); */
    border-bottom: 1px solid hsl(0, 0%, 90%);
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    text-align: left;

    transition: background-color 100ms ease-out;
  }

  th {
    background-color: #fff;
  }

  th.isSorting {
    border-left: 1px solid hsl(0, 0%, 75%);
    border-right: 1px solid hsl(0, 0%, 75%);
  }

  tr th:first-child {
    border-top-left-radius: 0.5rem;
  }
  tr th:last-child {
    border-top-right-radius: 0.5rem;
  }

  input[type="checkbox"] {
    display: none;
  }
  label {
    cursor: pointer;

    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    background-color: transparent;
    border: 2px solid #808080;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type="checkbox"]:checked + label {
    background-color: #0b5eda;
    border-color: #0b5eda;
  }
</style>
