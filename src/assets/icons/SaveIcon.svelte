<script lang="ts">
  interface Props {
    size?: number;
    color?: string;
  }

  let { size = 24, color = "#fff" }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clip-path="url(#clip0_98_155)">
    <path
      d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM12 19C10.34 19 9 17.66 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 17.66 13.66 19 12 19ZM15 9H5V5H15V9Z"
      fill={color}
    />
  </g>
  <defs>
    <clipPath id="clip0_98_155">
      <rect width="24" height="24" fill="white" />
    </clipPath>
  </defs>
</svg>
