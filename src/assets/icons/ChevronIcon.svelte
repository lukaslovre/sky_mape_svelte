<script lang="ts">
  interface Props {
    size?: number;
    color?: string;
    rotation?: number;
  }

  let { size = 32, color = "#000", rotation = 0 }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  transform={`rotate(${rotation})`}
  viewBox="0 0 32 32"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clip-path="url(#clip0_102_13)">
    <path
      d="M13.3331 8L11.4531 9.88L17.5598 16L11.4531 22.12L13.3331 24L21.3331 16L13.3331 8Z"
      fill={color}
    />
  </g>
  <defs>
    <clipPath id="clip0_102_13">
      <rect width="32" height="32" fill="white" />
    </clipPath>
  </defs>
</svg>
