<script lang="ts">
  interface Props {
    size?: number;
    color?: string;
  }

  let { size = 48, color = "#78BF40" }: Props = $props();
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
    d="M18.9355 14.7192C19.05 14.4356 19.3252 14.25 19.631 14.25H36.0133C36.5449 14.25 36.9078 14.7879 36.7087 15.2808L29.4395 33.2808C29.325 33.5644 29.0498 33.75 28.744 33.75H12.3617C11.8301 33.75 11.4672 33.2121 11.6663 32.7192L18.9355 14.7192Z"
    fill="#1A1A1A"
  />
  <path d="M16.5 20.25H34.875L34.5 21.375H16.125L16.5 20.25Z" fill="white" />
  <path d="M24.375 14.25H25.5L17.625 33.75H16.5L24.375 14.25Z" fill="white" />
</svg>
