<script lang="ts">
  interface Props {
    size?: number;
    color?: string;
  }

  let { size = 24, color = "#067925" }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M16 12.7919V15.9999H12.8V12.7919H16ZM16 7.99512V11.1919H12.8V7.99512H16ZM11.2 7.99512H8V11.1919H11.2V7.99512ZM11.2 12.7919H8V15.9999H11.2V12.7919Z"
    fill={color}
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M1.59961 2.4C1.59961 1.76348 1.85247 1.15303 2.30255 0.702944C2.75264 0.252856 3.36309 0 3.99961 0L17.1308 0L22.3996 5.2688V21.6C22.3996 22.2365 22.1468 22.847 21.6967 23.2971C21.2466 23.7471 20.6361 24 19.9996 24H3.99961C3.36309 24 2.75264 23.7471 2.30255 23.2971C1.85247 22.847 1.59961 22.2365 1.59961 21.6V2.4ZM17.5996 6.3952H6.39961V17.6H17.5996V6.3952Z"
    fill={color}
  />
</svg>
