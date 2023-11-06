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

// Helper function to create an empty matrix
float** createFloatMatrix(int rows, int cols) {
    float** matrix = new float*[rows];
    for (int i = 0; i < rows; i++) {
        matrix[i] = new float[cols]();
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
    int D = 0;
    int** temp = createIntMatrix(n - 1, n - 1);

    for (int f = 0; f < n; f++) {
        getCofactor(matrix, temp, 0, f, n);
        D += (f % 2 == 0 ? 1 : -1) * matrix[0][f] * determinant(temp, n - 1);
    }

    deleteMatrix(temp, n - 1);
    return D;
}

// Calculates the adjoint of a matrix
extern "C" {
  EMSCRIPTEN_KEEPALIVE
  int** adjointCPP(int** matrix, int n) {
      int** adj = createIntMatrix(n, n);
      int** temp = createIntMatrix(n, n);

      for (int i = 0; i < n; i++) {
          for (int j = 0; j < n; j++) {
              getCofactor(matrix, temp, i, j, n);
              adj[j][i] = ((i + j) % 2 == 0 ? 1 : -1) * determinant(temp, n - 1);
          }
      }

      deleteMatrix(temp, n - 1);
      return adj;
  }
}

// Calculates the inverse of a matrix
extern "C" {
  EMSCRIPTEN_KEEPALIVE
  float** inverseCPP(int** matrix, int n) {
    float det = static_cast<float>(determinant(matrix, n));

    if (det == 0) {
        return nullptr;
    }

    int** adj = adjointCPP(matrix, n);
    float** inverseMatrix = createFloatMatrix(n, n);

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            float value = static_cast<float>(adj[i][j]) / det;
            inverseMatrix[i][j] = value;
        }
    }

    deleteMatrix(adj, n);
    return inverseMatrix;
  }
}
