<script lang="ts">
  interface Props {
    size?: number;
    color?: string;
  }

  let { size = 48, color = "#D16047" }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="24" cy="24" r="24" fill={color} />
  <circle cx="24" cy="24" r="18" fill="white" />
  <rect x="15" y="11.25" width="18" height="22.5" rx="0.75" fill="#1A1A1A" />
  <path
    d="M24 26.25C24 25.8358 24.3358 25.5 24.75 25.5H29.25C29.6642 25.5 30 25.8358 30 26.25V33.75H24V26.25Z"
    fill="white"
  />
  <rect x="18" y="25.5" width="3" height="3" rx="0.375" fill="white" />
  <rect x="18" y="19.5" width="3" height="3" rx="0.375" fill="white" />
  <rect x="18" y="13.5" width="3" height="3" rx="0.375" fill="white" />
</svg>
