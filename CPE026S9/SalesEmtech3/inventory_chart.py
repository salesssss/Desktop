import matplotlib.pyplot as plt
import numpy as np

sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL']
colors = ['orange', 'blue', 'red', 'brown', 'purple', 'pink']

shirt_types = ['PRIM-BLACK', 'PRIM-GREY', 'PRIM-WHITE', 'REG-BLACK', 'REG-WHITE']
inventory = [
    [5, 20, 20, 10, 8, 25],
    [3, 10, 9, 4, 5, 20],
    [7, 22, 22, 22, 2, 0],
    [2, 5, 5, 5, 7, 20],
    [1, 4, 6, 3, 9, 22],
]

x = np.arange(len(shirt_types))
width = 0.12

fig, ax = plt.subplots(figsize=(10, 6))
for i in range(len(sizes)):
    offset = (i - len(sizes) / 2) * width + width / 2
    ax.bar(x + offset, [inv[i] for inv in inventory], width, label=sizes[i], color=colors[i])

ax.set_ylabel('Inventory Count')
ax.set_title('RawShirt Inventory by Size')
ax.set_xticks(x)
ax.set_xticklabels(shirt_types)
ax.legend(title='Size')

plt.tight_layout()
plt.savefig("inventory_chart.png")  # ← saves chart to file
