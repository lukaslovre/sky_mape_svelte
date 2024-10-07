<script lang="ts">
  import { getInteractionsFromDb } from "../../models/Interactions";
  import type { Interaction } from "../../types";
  import Header1 from "../common/Header1.svelte";

  let interactions: Interaction[] = [];

  getInteractionsFromDb()
    .then((data) => {
      interactions = data;
    })
    .catch((error) => {
      console.error(error);
    });

  // Group interactions by date
  $: groupedInteractions = interactions.reduce(
    (acc, interaction) => {
      const date = new Date(interaction.date || interaction.created).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(interaction);
      return acc;
    },
    {} as Record<string, Interaction[]>
  );

  // Sort dates in descending order
  $: sortedDates = Object.keys(groupedInteractions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  function daysAgo(date: Date): number {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
</script>

<div class="owners-container">
  <Header1>Interakcije</Header1>

  <div class="interactions-timeline">
    {#each sortedDates as date}
      <div class="date-group">
        <h2 class="date-label">{`${date} (${daysAgo(new Date(date))} days ago)`}</h2>
        <ul class="interaction-list">
          {#each groupedInteractions[date].sort((a, b) => new Date(b.date || b.created).getTime() - new Date(a.date || a.created).getTime()) as interaction}
            <li class="interaction-item">
              <div class="interaction-time">
                {new Date(interaction.date || interaction.created).toLocaleTimeString()}
              </div>
              <div class="interaction-type">{interaction.type}</div>
              <div class="interaction-note">{interaction.note}</div>
              <div class="interaction-details">
                <span>Agent ID: {interaction.expand?.agent_id.name}</span>
                <span>
                  {#if interaction.expand?.user_id}
                    User ID: {interaction.expand.user_id.name}
                  {/if}
                </span>
                <span>
                  {#if interaction.property_id}
                    Property ID: {interaction.property_id}
                  {/if}
                </span>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>

<style>
  .owners-container {
    padding: 2.5rem;

    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }

  :root {
    --primary-color: #0b5eda;
    --secondary-color: hsl(0, 0%, 25%);
  }

  .interactions-timeline {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }

  .date-label {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a1a1a;

    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .interaction-list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
  }

  .interaction-item {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .interaction-time {
    font-size: 0.875rem;
    color: var(--secondary-color);
    margin-bottom: 0.25rem;
  }

  .interaction-type {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-color);
  }

  .interaction-note {
    margin-bottom: 0.25rem;
  }

  .interaction-details {
    display: flex;

    font-size: 0.875rem;
    color: var(--secondary-color);
  }

  .interaction-details span {
    flex: 1;
    text-align: center;
  }
  .interaction-details span:first-child {
    text-align: left;
  }
  .interaction-details span:last-child {
    text-align: right;
  }
</style>
