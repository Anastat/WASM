#include <iostream>
#include <emscripten.h>

// Helper function to create an empty matrix
int** createIntMatrix(int rows, int cols) {
    int** matrix = new int*[rows];
    for (int i = 0; i < rows; i++) {
        matrix[i] = new int[cols]();
    }
    return matrix;
}

// Helper function to delete a matrix
template <typename T>
void deleteMatrix(T** matrix, int rows) {
    for (int i = 0; i < rows; i++) {
        delete[] matrix[i];
    }
    delete[] matrix;
}

// Helper function to calculate the cofactor of a matrix
void getCofactor(int** matrix, int** temp, int p, int q, int n) {
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

// Helper function to calculate the determinant of a matrix
int determinant(int** matrix, int n) {
    if (n == 1) return matrix[0][0];
    int det = 0;
    int sign = 1;

    for (int i = 0; i < n; ++i) {
        int** submatrix = createIntMatrix(n - 1, n - 1);
        getCofactor(matrix, submatrix, 0, i, n);
        det += sign * matrix[0][i] * determinant(submatrix, n - 1);

        sign = -sign;
        deleteMatrix(submatrix, n - 1);
    }

    return det;
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

// Calculates the adjoint of a matrix
extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void adjointCPP(int* inputMatrix, int n, int* resultMatrix) {
        // Convert the pointers to a 2D array
        int** matrix = createIntMatrix(n, n);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = inputMatrix[i * n + j];
            }
        }

        int** adj = createIntMatrix(n, n);
        int** temp = createIntMatrix(n, n);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                getCofactor(matrix, temp, i, j, n);
                adj[j][i] = ((i + j) % 2 == 0 ? 1 : -1) * determinant(temp, n - 1);
            }
        }

        // Copy the result matrix back to the resultMatrix pointer
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                resultMatrix[i * n + j] = adj[i][j];
            }
        }

        // Delete the dynamically allocated memory for matrix
        deleteMatrix(matrix, n);
        deleteMatrix(adj, n);
        deleteMatrix(temp, n - 1);
    }
}

// Calculates the inverse of a matrix
extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void inverseCPP(int* inputMatrix, int n, float* resultMatrix) {
        // Convert the pointers to a 2D array
        int** matrix = createIntMatrix(n, n);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = inputMatrix[i * n + j];
            }
        }

        float det = static_cast<float>(determinant(matrix, n));

        if (det == 0) {
            std::cerr << "Inverse does not exist (matrix is singular)." << std::endl;
            deleteMatrix(matrix, n);
            return;
        }

        int** adj = createIntMatrix(n, n);
        int** temp = createIntMatrix(n, n);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                getCofactor(matrix, temp, i, j, n);
                adj[j][i] = ((i + j) % 2 == 0 ? 1 : -1) * determinant(temp, n - 1);
            }
        }

        // Copy the result matrix back to the resultMatrix pointer
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                resultMatrix[i * n + j] = static_cast<float>(adj[i][j]) / det;
            }
        }

        // Clean up memory
        deleteMatrix(matrix, n);
        deleteMatrix(adj, n);
        deleteMatrix(temp, n);
    }
}
