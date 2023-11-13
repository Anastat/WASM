#include <iostream>
#include <vector>
#include <emscripten.h>

// Helper function to calculate the determinant of a matrix
long long determinant(std::vector<std::vector<long long>>& matrix, int n) {
    if (n == 1) return matrix[0][0];
    long long det = 0;
    int sign = 1;

    for (int i = 0; i < n; ++i) {
        std::vector<std::vector<long long>> temp(n - 1, std::vector<long long>(n - 1));
        for (int j = 1; j < n; ++j) {
            for (int k = 0; k < n; ++k) {
                if (k != i) {
                    temp[j - 1][k < i ? k : k - 1] = matrix[j][k];
                }
            }
        }

        det += sign * matrix[0][i] * determinant(temp, n - 1);
        sign = -sign;
    }

    return det;
}

// Helper function to calculate the cofactor of a matrix
void getCofactor(std::vector<std::vector<long long>>& matrix, std::vector<std::vector<long long>>& temp, int p, int q, int n) {
    int i = 0, j = 0;
    for (int row = 0; row < n; row++) {
        for (int col = 0; col < n; col++) {
            if (row != p && col != q) {
                temp[i][j++] = matrix[row][col];
                if (j == n - 1) {
                    j = 0;
                    i++;
                }
            }
        }
    }
}

// Helper function to convert a vector of vectors to a flat array
void flattenMatrix(const std::vector<std::vector<long long>>& matrix, long long* flatArray, int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            flatArray[i * n + j] = matrix[i][j];
        }
    }
}

// Helper function to calculate the adjoint of a matrix using vectors
void adjoint(std::vector<std::vector<long long>>& matrix, int n, std::vector<std::vector<long long>>& adj) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            std::vector<std::vector<long long>> temp(n - 1, std::vector<long long>(n - 1));
            getCofactor(matrix, temp, i, j, n);

            adj[j][i] = ((i + j) % 2 == 0 ? 1 : -1) * determinant(temp, n - 1);
        }
    }
}

// Calculates the transpose of a matrix
extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void transposeCPP(const int* inputMatrix, int numRows, int numCols, int* resultMatrix) {
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                resultMatrix[j * numRows + i] = inputMatrix[i * numCols + j];
            }
        }
    }
}

// Calculates the inverse of a matrix
extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void inverseCPP(int* inputMatrix, int n, float* resultMatrix) {
        std::vector<std::vector<long long>> matrix(n, std::vector<long long>(n));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = inputMatrix[i * n + j];
            }
        }

        long long det = determinant(matrix, n);

        if (det == 0) {
            std::cerr << "Inverse does not exist (matrix is singular)." << std::endl;
            return;
        }

        std::vector<std::vector<long long>> adj(n, std::vector<long long>(n));
        adjoint(matrix, n, adj);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                resultMatrix[i * n + j] = static_cast<float>(adj[i][j]) / det;
            }
        }
    }
}

// Calculates the adjoint of a matrix
extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void adjointCPP(int* inputMatrix, int n, long long* resultMatrix) {
         std::vector<std::vector<long long>> matrix(n, std::vector<long long>(n));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = inputMatrix[i * n + j];
            }
        }

        std::vector<std::vector<long long>> adj(n, std::vector<long long>(n));
        adjoint(matrix, n, adj);

        // Convert the vector of vectors to a flat array
        flattenMatrix(adj, resultMatrix, n);
    }
}