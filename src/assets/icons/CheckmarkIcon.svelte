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
  <g clip-path="url(#clip0_82_156)">
    <path
      d="M9.00016 16.1701L4.83016 12.0001L3.41016 13.4101L9.00016 19.0001L21.0002 7.00009L19.5902 5.59009L9.00016 16.1701Z"
      fill={color}
    />
  </g>
  <defs>
    <clipPath id="clip0_82_156">
      <rect width="24" height="24" fill="white" />
    </clipPath>
  </defs>
</svg>
