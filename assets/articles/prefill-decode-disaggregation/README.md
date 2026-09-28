# Figures and interactive diagram

This directory contains the seven research illustrations used by `articles/prefill-decode-disaggregation.html`. The original PNG files are preserved; the article loads lossless WebP copies with the same pixel dimensions. Each visible figure caption attributes the relevant paper or presentation and links to its matching reference entry.

| Files | Source |
| --- | --- |
| `splitwise-fig9`, `splitwise-fig10`, `splitwise-fig11` | Patel et al., Splitwise, ISCA 2024 |
| `distserve-fig6` | Zhong et al., DistServe, OSDI 2024 |
| `megatron-gtc2020-tp-pp` | Raul Puri, Megatron-LM, NVIDIA GTC 2020 |
| `mooncake-fig2`, `mooncake-fig10` | Qin et al., Mooncake, FAST 2025 |

`distserve-gpu-placement.html` is an interactive explanatory illustration of a DistServe-style GPU placement, not a reproduced paper figure. It is self-contained and uses no ChatGPT widget APIs. The article embeds it with a relative iframe URL; the shared stylesheet provides enough height for its stacked mobile layout.
