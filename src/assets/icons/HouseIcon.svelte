<script lang="ts">
  interface Props {
    size?: number;
    color?: string;
    backgroundColor?: string;
  }

  let { size = 24, color = "#000", backgroundColor = "#fff" }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M11.3647 2.5227C11.7338 2.21902 12.2662 2.21902 12.6353 2.5227L20.2382 8.77773C20.9629 9.37395 20.5413 10.55 19.6029 10.55H4.39715C3.45872 10.55 3.03712 9.37395 3.76181 8.77773L11.3647 2.5227Z"
    fill={color}
  />
  <rect x="4.41992" y="9.6001" width="15.1579" height="11.4" rx="1" fill={color} />
  <path
    d="M9.47461 15.0332C9.47461 14.4809 9.92232 14.0332 10.4746 14.0332H13.5272C14.0795 14.0332 14.5272 14.4809 14.5272 15.0332V20.9998H9.47461V15.0332Z"
    fill={backgroundColor}
  />
</svg>
