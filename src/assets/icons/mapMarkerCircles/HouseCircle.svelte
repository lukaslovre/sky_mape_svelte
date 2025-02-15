<script lang="ts">
  interface Props {
    size?: number;
    color?: string;
  }

  let { size = 48, color = "#477ED1" }: Props = $props();
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
  <path
    d="M23.5243 11.6403C23.8008 11.4134 24.1992 11.4134 24.4757 11.6403L34.72 20.0452C35.2645 20.4919 34.9486 21.375 34.2443 21.375H13.7557C13.0514 21.375 12.7355 20.4919 13.28 20.0452L23.5243 11.6403Z"
    fill="#1A1A1A"
  />
  <rect x="15" y="20.25" width="18" height="13.5" rx="0.75" fill="#1A1A1A" />
  <path
    d="M21 26.25C21 25.8358 21.3358 25.5 21.75 25.5H26.25C26.6642 25.5 27 25.8358 27 26.25V33.75H21V26.25Z"
    fill="white"
  />
</svg>
