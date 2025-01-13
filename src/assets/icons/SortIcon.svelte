<script lang="ts">
  interface Props {
    size?: number;
    color?: string;
  }

  let { size = 24, color = "#000000" }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clip-path="url(#clip0_245_301)">
    <path d="M3 18H9V16H3V18ZM3 6V8H21V6H3ZM3 13H15V11H3V13Z" fill={color} />
  </g>
  <defs>
    <clipPath id="clip0_245_301">
      <rect width="24" height="24" fill="white" />
    </clipPath>
  </defs>
</svg>
