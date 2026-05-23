#include <stdio.h>

int main() {
    int key = 42;
    int encoded[] = { /* XOR each char of "xored_binary_secret" with 42 */ };

    int length = sizeof(encoded)/sizeof(encoded[0]);
    printf("Vault checker running...\n");
    printf("Static analysis needed to recover the hidden flag.\n");

    for (int i = 0; i < length; i++) {
        printf("%c", encoded[i] ^ key);
    }
    printf("\n");
    return 0;
}